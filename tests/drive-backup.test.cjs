const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { transformSync } = require('esbuild');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

// Exercise the actual JSX handlers with controlled hooks and API responses.
function harness() {
  const notices = [], alerts = [], states = [];
  let cursor = 0;
  const toast = (content, options) => notices.push({ type: 'warning', content, options });
  toast.success = (content, options) => notices.push({ type: 'success', content, options });
  toast.error = (content) => notices.push({ type: 'error', content });
  const hooks = {
    ...React,
    useEffect() {},
    useState(initial) {
      const index = cursor++;
      if (!(index in states)) states[index] = initial;
      return [states[index], (next) => { states[index] = typeof next === 'function' ? next(states[index]) : next; }];
    },
    useRef(initial) {
      const index = cursor++;
      if (!(index in states)) states[index] = { current: initial };
      return states[index];
    },
  };
  const apis = {};
  function load(file) {
    const filename = path.resolve(file);
    const { code } = transformSync(fs.readFileSync(filename, 'utf8'), {
      loader: 'jsx', format: 'cjs', jsx: 'automatic',
    });
    const module = { exports: {} };
    const localRequire = (id) => {
      if (id === 'react') return hooks;
      if (id === 'react-hot-toast') return toast;
      if (id === 'framer-motion') return { motion: { div: 'div' }, AnimatePresence: 'div' };
      if (id === 'lucide-react') return { X: () => null };
      if (id.includes('/api/')) return apis;
      if (id.includes('DriveBackupNotice')) return () => null;
      if (id.startsWith('.')) {
        const base = path.resolve(path.dirname(filename), id);
        return load(['', '.js', '.jsx'].map(ext => base + ext).find(p => fs.existsSync(p)));
      }
      return require(id);
    };
    new Function('require', 'module', 'exports', 'alert', 'console', code)(
      localRequire, module, module.exports, msg => alerts.push(msg), { log() {}, error() {} },
    );
    return module.exports;
  }
  return { notices, alerts, apis, load, render(Component, props) { cursor = 0; return Component(props); } };
}

function find(node, predicate) {
  if (!node || typeof node !== 'object') return undefined;
  if (predicate(node)) return node;
  for (const child of [node.props?.children].flat(Infinity)) {
    const found = find(child, predicate);
    if (found) return found;
  }
}

test('backup notifications support direct and Axios responses, safe links, and legacy success', () => {
  const h = harness();
  const notify = h.load('src/utils/notifyCreateResult.jsx').default;
  let legacy = 0;
  const fallback = () => legacy++;
  notify({}, fallback);
  assert.equal(legacy, 1);
  for (const wrap of [googleDrive => ({ googleDrive }), googleDrive => ({ data: { googleDrive } })]) {
    notify(wrap({ status: 'saved', webViewLink: 'https://drive.google.com/file/d/test/view' }), fallback);
    const html = renderToStaticMarkup(h.notices.at(-1).content);
    assert.match(html, /Saved successfully and backed up to Google Drive\./);
    assert.match(html, /Open in Drive/);
    assert.match(html, /rel="noopener noreferrer"/);
    notify(wrap({ status: 'failed' }), fallback);
    assert.equal(h.notices.at(-1).type, 'warning');
    assert.match(renderToStaticMarkup(h.notices.at(-1).content), /Record saved in database/);
    assert.match(renderToStaticMarkup(h.notices.at(-1).content), /\/admin\/gallery/);
  }
  for (const webViewLink of [undefined, 'bad URL', 'javascript:alert(1)']) {
    notify({ googleDrive: { status: 'saved', webViewLink } }, fallback);
    assert.doesNotMatch(renderToStaticMarkup(h.notices.at(-1).content), /<a /);
  }
  assert.equal(legacy, 1);
});

const forms = [
  ['src/pages/admin/Courses/Courseadd.jsx', 'addCourseApi'],
  ['src/pages/admin/CertificateAdmin/CertificateAdd.jsx', 'addCertificateApi'],
  ['src/pages/admin/Quotation/QuotationForm.jsx', 'addQuotation'],
  ['src/pages/admin/InvoiceTechnovahub/InvoiceForm.jsx', 'addInvoice'],
  ['src/pages/admin/Aroun Invoice/ArounInvoiceForm.jsx', 'addAInvoice'],
  ['src/Components/admin/RecordCreateForm.jsx', 'createRecord'],
];

for (const [file, api] of forms) {
  for (const status of ['saved', 'failed', undefined, 'request-error']) {
    test(`${path.basename(file)}: ${status || 'legacy'} completes correctly and prevents duplicate submits`, async () => {
      const h = harness();
      let calls = 0, complete = 0, resolve, reject;
      const request = new Promise((yes, no) => { resolve = yes; reject = no; });
      const createRecord = () => { calls++; return request; };
      h.apis[api] = createRecord;
      const Component = h.load(file).default;
      const props = {
        onDone: () => complete++, onUpdateComplete: () => complete++,
        onRefresh: () => complete++, onClose() {},
        title: 'Test', fields: [{ name: 'title', label: 'Title', required: true }],
        createRecord, successMessage: 'Saved legacy record',
      };
      let tree = h.render(Component, props);
      // Fill controlled inputs to satisfy the forms' own validation.
      function fill(node) {
        if (!node || typeof node !== 'object') return;
        if (['input', 'textarea'].includes(node.type) && node.props.onChange) {
          node.props.onChange({ target: { name: node.props.name, value: 'Example' } });
        }
        for (const child of [node.props?.children].flat(Infinity)) fill(child);
      }
      fill(tree);
      tree = h.render(Component, props);
      const submit = find(tree, node => node.type === 'form').props.onSubmit;
      const pending = submit({ preventDefault() {} });
      await submit({ preventDefault() {} });
      assert.equal(calls, 1);
      tree = h.render(Component, props);
      const button = find(tree, node => node.props?.type === 'submit');
      assert.equal(button.props.disabled, true);
      assert.equal(button.props.children, 'Saving…');
      if (status === 'request-error') reject(new Error('Network unavailable'));
      else resolve(status ? { googleDrive: { status } } : {});
      await pending;
      tree = h.render(Component, props);
      assert.equal(find(tree, node => node.props?.type === 'submit').props.disabled, false);
      assert.equal(calls, 1);
      if (status === 'request-error') {
        assert.equal(complete, 0);
        assert.ok(h.notices.some(n => n.type === 'error') || h.alerts.some(a => /Error saving/.test(a)));
      } else {
        if (api !== 'createRecord') assert.equal(complete, 1);
        else assert.equal(find(tree, node => node.type === 'input').props.value, '');
        assert.ok(!h.notices.some(n => n.type === 'error'));
        if (status === 'failed') assert.equal(h.notices.at(-1).type, 'warning');
        if (status === 'saved') assert.equal(h.notices.at(-1).type, 'success');
      }
    });
  }
}
