const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const React = require('react');
const { transformSync } = require('esbuild');
const root = path.resolve(__dirname, '..');

function load(filename, dependencies, globals = {}) {
  const module = { exports: {} };
  const code = transformSync(fs.readFileSync(path.join(root, filename), 'utf8'), {
    loader: filename.endsWith('.jsx') ? 'jsx' : 'js', format: 'cjs',
  }).code;
  vm.runInNewContext(code, { module, exports: module.exports, console: { error() {} }, ...globals,
    require(name) {
      if (!(name in dependencies)) throw new Error(`Unexpected dependency ${name}`);
      return dependencies[name];
    },
  });
  return module.exports;
}

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

test('backend warmup is credential-free, deduplicated and refreshed after a minute', async () => {
  let time = 1000;
  const calls = [];
  const api = load('src/api/authApi.js', {
    './apiClient': {}, '../data/constants': { API_BASE_URL: 'https://backend.example/' },
  }, { Date: { now: () => time }, AbortSignal: { timeout: ms => ({ timeout: ms }) }, fetch: (url, options) => {
    calls.push({ url, options }); return Promise.resolve({ ok: true });
  } });
  const first = api.warmAdminApi();
  assert.equal(first, api.warmAdminApi());
  await first;
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://backend.example/');
  assert.equal(calls[0].options.credentials, 'omit');
  assert.equal(calls[0].options.headers, undefined);
  assert.equal(calls[0].options.body, undefined);
  time += 60_001;
  await api.warmAdminApi();
  assert.equal(calls.length, 2);
});

test('failed warmup is harmless and login still performs the normal authentication request', async () => {
  const calls = [];
  const api = load('src/api/authApi.js', {
    './apiClient': { post: async (...args) => { calls.push(args); return { data: { success: true, token: 'test-token' } }; } },
    '../data/constants': { API_BASE_URL: 'https://backend.example' },
  }, { Date, AbortSignal: { timeout: () => ({}) }, fetch: () => Promise.reject(new Error('Offline')) });
  await assert.doesNotReject(api.warmAdminApi());
  const result = await api.loginAdmin('test-user', 'test-password');
  assert.equal(result.token, 'test-token');
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], '/auth/login');
  assert.equal(calls[0][1].userName, 'test-user');
  assert.equal(calls[0][1].password, 'test-password');
});

function mount() {
  let cursor, tree, warmupCalls = 0;
  const state = [], refs = [], effects = [], requests = [], navigations = [], errors = [], storage = new Map();
  const pendingLogin = deferred();
  const pendingWarmup = deferred();
  const component = load('src/pages/admin/adminlogin/AdminLogin.jsx', {
    react: { ...React, useEffect: fn => { effects.push(fn); }, useRef: initial => {
      const index = cursor++; return refs[index] ||= { current: initial };
    }, useState: initial => {
      const index = cursor++;
      if (!(index in state)) state[index] = initial;
      return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next; }];
    } },
    'react-router-dom': { Link: 'a', useNavigate: () => (...args) => navigations.push(args) },
    '../../../api/authApi': {
      warmAdminApi: () => { warmupCalls++; return pendingWarmup.promise; },
      loginAdmin: (...args) => { requests.push(args); return pendingLogin.promise; },
    },
    'react-hot-toast': { success() {}, error: message => errors.push(message) },
    'react-icons/ai': { AiOutlineEye: 'eye', AiOutlineEyeInvisible: 'eye-hidden', AiOutlineUser: 'user', AiOutlineLock: 'lock' },
    '../../../assets/images/logoremove.png': 'logo', '../../../assets/images/bk3.jpg': 'background',
  }, { Date, localStorage: { setItem: (key, value) => storage.set(key, value) } }).default;
  function render() { cursor = 0; tree = component(); }
  function find(type) {
    const out = [];
    function visit(node) {
      if (Array.isArray(node)) return node.forEach(visit);
      if (!node || typeof node !== 'object') return;
      if (node.type === type) out.push(node);
      visit(node.props.children);
    }
    visit(tree); return out;
  }
  render(); effects[0]();
  find('input')[0].props.onChange({ target: { value: 'TEST-USER' } });
  find('input')[1].props.onChange({ target: { value: 'test-password' } });
  render();
  return { render, find, requests, navigations, errors, storage, pendingLogin,
    warmupCalls: () => warmupCalls,
    submit: () => find('form')[0].props.onSubmit({ preventDefault() {} }),
  };
}

test('login does not await warmup, blocks duplicate submissions and redirects immediately after authentication', async () => {
  const login = mount();
  assert.equal(login.warmupCalls(), 1);
  const firstSubmit = login.submit();
  await login.submit();
  assert.equal(login.requests.length, 1);
  assert.deepEqual(login.requests[0], ['test-user', 'test-password']);
  assert.equal(login.navigations.length, 0);
  assert.equal(login.storage.size, 0);
  login.pendingLogin.resolve({ success: true, token: 'verified-token', user: { userName: 'test-user' } });
  await firstSubmit;
  assert.equal(login.storage.get('adminToken'), 'verified-token');
  assert.equal(login.navigations[0][0], '/admin');
  assert.ok(Number(login.storage.get('adminLoginAt')) > 0);
});

test('invalid credentials and network failures never authenticate and allow another attempt', async () => {
  for (const reject of [false, true]) {
    const login = mount();
    const submit = login.submit();
    if (reject) login.pendingLogin.reject(new Error('Network error'));
    else login.pendingLogin.resolve({ success: false, message: 'Invalid username or password' });
    await submit;
    assert.equal(login.storage.size, 0);
    assert.equal(login.navigations.length, 0);
    assert.equal(login.errors.length, 1);
    login.render();
    assert.equal(login.find('button').find(button => button.props.type === 'submit').props.disabled, false);
    await login.submit();
    assert.equal(login.requests.length, 2);
  }
});

test('password toggle preserves entered credentials and the website link still points home', () => {
  const login = mount();
  assert.equal(login.find('input')[1].props.type, 'password');
  const toggle = login.find('button').find(button => button.props.type === 'button');
  assert.equal(toggle.props['aria-label'], 'Show password');
  toggle.props.onClick(); login.render();
  assert.equal(login.find('input')[1].props.type, 'text');
  assert.equal(login.find('input')[1].props.value, 'test-password');
  assert.equal(login.find('button').find(button => button.props.type === 'button').props['aria-label'], 'Hide password');
  assert.equal(login.find('a')[0].props.to, '/');
  assert.ok(login.find('input').every(input => input.props.required));
  assert.equal(login.requests.length, 0);
});
