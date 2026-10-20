const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const React = require('react');
const { transformSync } = require('esbuild');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

function load(relativePath, dependencies, globals = {}) {
  const code = transformSync(fs.readFileSync(path.join(root, relativePath), 'utf8'), {
    loader: relativePath.endsWith('.jsx') ? 'jsx' : 'js', format: 'cjs',
  }).code;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, console, ...globals,
    require(name) {
      if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  return module.exports;
}

const records = Array.from({ length: 8 }, (_, i) => ({
  _id: (i + 1).toString(16).padStart(24, '0'), invoiceId: `QT-${100000 + i}`,
  invoiceTo: i < 6 ? 'Mr.Arun' : 'Other Customer', date: `2026-10-0${i + 1}`,
  items: [{ desc: 'Service', qty: 1, rate: i < 6 ? 100 : 200, discount: 0, gst: 18 }],
}));

function mount({ failIds = [], docType = 'quotation' } = {}) {
  let invoices = [...records], cursor = 0, tree;
  let refreshes = 0;
  const state = [], refs = [], requests = [], notifications = [], edits = [];
  const api = load('src/api/invoiceApi.js', { './apiClient': { delete: async url => {
    const id = url.split('/').pop();
    requests.push(id);
    if (failIds.includes(id)) throw new Error('Simulated server failure');
    assert.ok(invoices.some(record => record._id === id));
    invoices = invoices.filter(record => record._id !== id);
    return { data: { message: 'Invoice deleted successfully' } };
  } } });
  const component = load('src/pages/admin/InvoiceTechnovahub/InvoiceTable.jsx', {
    react: { ...React, useMemo: fn => fn(), useRef: initial => {
      const index = cursor++;
      if (!refs[index]) refs[index] = { current: initial };
      return refs[index];
    }, useState: initial => {
      const index = cursor++;
      if (!(index in state)) state[index] = initial;
      return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next; }];
    } },
    '../../../api/invoiceApi': api,
    'react-hot-toast': { success: message => notifications.push(message), error: message => notifications.push(message) },
    'react-router-dom': { Link: 'a' }, './QuotationIdSelect': 'quotation-select',
    './BulkQuotationDeleteDialog': 'delete-dialog',
  }, { window: { confirm: () => true }, alert: message => notifications.push(message) }).default;
  function render() {
    cursor = 0;
    tree = component({ invoices, docType, onEdit: record => edits.push(record), onRefresh: async () => { refreshes++; } });
  }
  function find(type, from = tree) {
    const out = [];
    function visit(node) {
      if (Array.isArray(node)) return node.forEach(visit);
      if (!node || typeof node !== 'object') return;
      if (node.type === type) out.push(node);
      visit(node.props.children);
    }
    visit(from); return out;
  }
  const text = node => Array.isArray(node) ? node.map(text).join('')
    : node && typeof node === 'object' ? text(node.props.children) : String(node ?? '');
  function button(label) { return find('button').find(node => text(node) === label); }
  async function click(label) { await button(label).props.onClick(); render(); }
  const checkboxes = () => find('input').filter(node => node.props.type === 'checkbox');
  function check(index) { checkboxes()[index].props.onChange(); render(); }
  function change(field, value) {
    if (field === 'id') find('quotation-select')[0].props.onChange(value);
    else find('input').filter(node => node.props.type !== 'checkbox')[{ name: 0, min: 1, max: 2 }[field]].props.onChange({ target: { value } });
    render();
  }
  function ids() { return find('tr', find('tbody')[0]).flatMap(row => {
    const cells = find('td', row);
    return cells.length === (docType === 'quotation' ? 8 : 7) ? [text(cells[docType === 'quotation' ? 1 : 0])] : [];
  }); }
  render();
  return { find, button, click, check, change, checkboxes, ids, requests, notifications, edits,
    dialog: () => find('delete-dialog')[0],
    render, remaining: () => invoices, refreshes: () => refreshes,
    async confirm() { await find('delete-dialog')[0].props.onConfirm(); render(); },
    cancel() { find('delete-dialog')[0].props.onCancel(); render(); },
  };
}

test('one or three selected database IDs are deleted only after confirmation', async () => {
  for (const count of [1, 3]) {
    const table = mount();
    for (let i = 1; i <= count; i++) table.check(i);
    await table.click(`Delete Selected (${count})`);
    assert.equal(table.requests.length, 0);
    assert.equal(table.dialog().props.count, count);
    await table.confirm();
    assert.deepEqual(table.requests, records.slice(0, count).map(record => record._id));
    assert.equal(table.remaining().length, 8 - count);
    assert.equal(table.refreshes(), 1);
    assert.ok(!table.dialog());
    assert.ok(table.checkboxes().every(box => !box.props.checked));
    assert.ok(!table.button(`Delete Selected (${count})`));
    assert.ok(table.notifications.some(message => message.includes('deleted successfully')));
    assert.ok(!table.ids().includes(records[0].invoiceId));
    table.render();
    assert.ok(!table.ids().includes(records[0].invoiceId), 'Refetched records stay deleted');
  }
});

test('Select All spans filtered pages; unchecking excludes exactly that record; Cancel sends no requests', async () => {
  const table = mount();
  table.change('name', '  arun  ');
  table.check(0);
  assert.ok(table.button('Delete Selected (6)'));
  assert.ok(table.checkboxes().every(box => box.props.checked));
  await table.click('2');
  assert.equal(table.ids().length, 1);
  assert.equal(table.checkboxes()[1].props.checked, true);
  table.check(1);
  const headerElement = {};
  table.checkboxes()[0].props.ref(headerElement);
  assert.equal(headerElement.indeterminate, true);
  await table.click('Delete Selected (5)');
  table.cancel();
  assert.equal(table.requests.length, 0);
  assert.equal(table.remaining().length, 8);
  await table.click('Delete Selected (5)');
  await table.confirm();
  assert.deepEqual(table.requests, records.slice(0, 5).map(record => record._id));
  assert.equal(table.remaining().length, 3);
  assert.deepEqual(table.ids(), [records[5].invoiceId], 'Pagination remains valid after deletion');
  assert.equal(table.button('Prev').props.disabled, true);
});

test('filter changes and Clear Filters discard stale selections; Select All toggles off', async () => {
  const table = mount();
  for (const [field, value] of [['name', 'Arun'], ['id', records[0].invoiceId], ['min', '100'], ['max', '100']]) {
    table.check(0);
    table.change(field, value);
    assert.ok(table.checkboxes().every(box => !box.props.checked));
    assert.ok(!table.find('button').some(node => String(node.props.children).includes('Delete Selected')));
  }
  table.check(0);
  assert.ok(table.button('Delete Selected (1)'));
  table.check(0);
  assert.equal(table.checkboxes()[0].props.checked, false);
  table.check(0);
  await table.click('Clear Filters');
  assert.equal(table.ids().length, 5);
  assert.ok(table.checkboxes().every(box => !box.props.checked));
  assert.equal(table.requests.length, 0);
});

test('partial failures keep failed records selected and remove only confirmed successes', async () => {
  const table = mount({ failIds: [records[1]._id] });
  table.check(1); table.check(2); table.check(3);
  await table.click('Delete Selected (3)');
  await table.confirm();
  assert.equal(table.remaining().length, 6);
  assert.ok(table.remaining().some(record => record._id === records[1]._id));
  assert.ok(table.button('Delete Selected (1)'));
  assert.ok(table.notifications.some(message => message.includes('remain selected for retry')));
});

test('individual Edit/Delete remain available; invoice mode has no bulk controls', async () => {
  const table = mount();
  await table.click('Edit');
  assert.equal(table.edits[0]._id, records[0]._id);
  await table.click('Delete');
  assert.deepEqual(table.requests, [records[0]._id]);
  assert.equal(table.refreshes(), 1);
  const invoice = mount({ docType: 'invoice' });
  assert.equal(invoice.checkboxes().length, 0);
  assert.ok(invoice.button('Edit'));
  assert.ok(invoice.button('Delete'));
});

test('API validates IDs before any request, deduplicates, and limits concurrency', async () => {
  const calls = [];
  let inFlight = 0, peak = 0;
  const api = load('src/api/invoiceApi.js', { './apiClient': { delete: async url => {
    calls.push(url); peak = Math.max(peak, ++inFlight);
    await new Promise(resolve => setTimeout(resolve, 1)); inFlight--;
    return { data: {} };
  } } });
  for (const invalid of [null, {}, [], ['invalid'], [records[0]._id, 'invalid'], [undefined]]) {
    await assert.rejects(api.deleteSelectedQuotations(invalid));
  }
  assert.equal(calls.length, 0);
  const result = await api.deleteSelectedQuotations([...records.map(record => record._id), records[0]._id]);
  assert.equal(result.deletedCount, 8);
  assert.equal(result.failedIds.length, 0);
  assert.equal(calls.length, 8);
  assert.ok(peak <= 5);
  assert.deepEqual(calls, records.map(record => `/invoice/${record._id}`));
});

test('confirmation dialog warns about all selected records, labels the action, and prevents cancel while busy', () => {
  let props, cancelled = 0, confirmed = 0, opened = 0;
  const dialog = { showModal() { opened++; }, close() {} };
  const component = load('src/pages/admin/InvoiceTechnovahub/BulkQuotationDeleteDialog.jsx', {
    react: { ...React, useRef: () => ({ current: dialog }), useId: () => 'test-id', useEffect: fn => fn() },
  }).default;
  function render(busy = false) {
    const tree = component({ count: 8, allSelected: true, busy, onCancel() { cancelled++; }, onConfirm() { confirmed++; } });
    props = tree.props;
    return tree;
  }
  let tree = render();
  assert.equal(opened, 1);
  const description = tree.props.children[1].props.children;
  assert.match(description.join(''), /all 8 selected quotations matching the current filters/);
  assert.match(description.join(''), /cannot be undone/);
  const buttons = tree.props.children[2].props.children;
  assert.equal(buttons[0].props.children, 'Cancel');
  assert.equal(buttons[1].props.children, 'Delete 8 Quotations');
  buttons[0].props.onClick(); assert.equal(cancelled, 1);
  buttons[1].props.onClick(); assert.equal(confirmed, 1);
  tree = render(true);
  assert.ok(tree.props.children[2].props.children.every(button => button.props.disabled));
  props.onCancel({ preventDefault() {} });
  assert.equal(cancelled, 1);
});

test('repeated confirmation does not issue duplicate deletion requests', async () => {
  const table = mount();
  table.check(1);
  await table.click('Delete Selected (1)');
  const confirm = table.dialog().props.onConfirm;
  await Promise.all([confirm(), confirm()]);
  table.render();
  assert.deepEqual(table.requests, [records[0]._id]);
  assert.equal(table.refreshes(), 1);
});
