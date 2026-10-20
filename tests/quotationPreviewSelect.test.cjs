const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const React = require('react');
const { transformSync } = require('esbuild');
const folder = path.resolve(__dirname, '../src/pages/admin/InvoiceTechnovahub');

function mount(filename, initialProps, dependencies = {}, globals = {}) {
  const hooks = [];
  let cursor, tree, props = initialProps, effects;
  const react = { ...React,
    useState(initial) {
      const index = cursor++;
      if (!(index in hooks)) hooks[index] = initial;
      return [hooks[index], value => { hooks[index] = typeof value === 'function' ? value(hooks[index]) : value; }];
    },
    useRef(initial) { const index = cursor++; return hooks[index] ||= { current: initial }; },
    useId() { return `test-${cursor++}`; },
    useEffect(fn, deps) {
      const index = cursor++;
      if (!hooks[index] || deps.some((dep, i) => dep !== hooks[index][i])) effects.push(fn);
      hooks[index] = deps;
    },
  };
  const module = { exports: {} };
  const code = transformSync(fs.readFileSync(path.join(folder, filename), 'utf8'), { loader: 'jsx', format: 'cjs' }).code;
  vm.runInNewContext(code, { module, exports: module.exports, console, ...globals,
    require(name) {
      if (name === 'react') return react;
      if (name in dependencies) return dependencies[name];
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  function render(nextProps = props) {
    props = nextProps; cursor = 0; effects = [];
    tree = module.exports.default(props); effects.forEach(fn => fn());
  }
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
  const text = node => Array.isArray(node) ? node.map(text).join('') :
    node && typeof node === 'object' ? text(node.props.children) : String(node ?? '');
  render();
  return { render, find, text, allText: () => text(tree) };
}

test('shared selector searches API IDs and drives the existing preview, download, print and Modify Changes', async () => {
  const records = ['QT-821050', 'QT-953456', 'QT-532275'].map((invoiceId, index) => ({
    _id: `record-${index}`, invoiceId, invoiceTo: `Customer ${index}`, address: `Address ${index}`,
    date: '2026-10-01', dueDate: '2026-10-31',
    items: [{ desc: `Service ${index}`, qty: 1, rate: 100 + index, discount: 0, gst: 18 }],
  }));
  let apiCalls = 0, printed = 0, printHtml = '';
  const savedFiles = [], renderedClones = [];
  const printWindow = { document: { open() {}, close() {}, write(html) { printHtml = html; } },
    focus() {}, print() { printed++; }, close() {} };
  const page = mount('InvoiceCertificate.jsx', { docType: 'invoice' }, {
    '../../../api/invoiceApi': { getInvoice: async () => { apiCalls++; return [...records, { invoiceId: 'INV-001' }]; } },
    './QuotationIdSelect': 'quotation-select',
    html2canvas: async clone => { renderedClones.push(clone); return { width: 800, height: 1100, toDataURL: () => 'image' }; },
    jspdf: class { internal = { pageSize: { getWidth: () => 210, getHeight: () => 297 } }; addImage() {} save(name) { savedFiles.push(name); } },
    'react-icons/fa': { FaDownload: 'download-icon', FaPrint: 'print-icon' },
    '../../../assets/images/logoremove.png': 'logo.png', 'react-router-dom': { Link: 'a' },
  }, { document: { body: { appendChild() {}, removeChild() {} }, querySelectorAll: () => [] },
    window: { open: () => printWindow }, setTimeout: fn => fn(),
  });
  await new Promise(resolve => setImmediate(resolve)); page.render();
  const selectorProps = () => page.find('quotation-select')[0].props;
  assert.equal(selectorProps().value, records[0].invoiceId);
  assert.ok(page.allText().includes('Customer 0'));
  assert.equal(selectorProps().includeAllOption, false);
  assert.equal(selectorProps().emptyMessage, 'No quotation found');
  const listeners = {};
  const dropdown = mount('QuotationIdSelect.jsx', selectorProps(), {}, { document: {
    addEventListener: (type, fn) => { listeners[type] = fn; }, removeEventListener() {},
    getElementById: () => ({ scrollIntoView() {} }),
  } });
  const input = () => dropdown.find('input')[0];
  const options = () => dropdown.find('li').filter(node => node.props.role === 'option');
  function open() { input().props.onFocus(); dropdown.render(selectorProps()); }
  function type(value) { input().props.onChange({ target: { value } }); dropdown.render(selectorProps()); }
  function select(id) {
    options().find(node => node.props.children === id).props.onClick();
    page.render(); dropdown.render(selectorProps());
  }
  open(); assert.deepEqual(options().map(node => node.props.children), records.map(record => record.invoiceId));
  for (const query of ['953', '953456', 'QT-953456', 'QT-95', '  qt-953  ']) {
    type(query); assert.deepEqual(options().map(node => node.props.children), ['QT-953456']);
    assert.equal(selectorProps().value, 'QT-821050', 'Typing alone must not change the selected preview');
  }
  select('QT-953456');
  assert.equal(input().props['aria-expanded'], false);
  assert.equal(selectorProps().value, 'QT-953456');
  assert.ok(page.allText().includes('Customer 1'));
  assert.ok(page.allText().includes('Service 1'));
  assert.ok(!page.allText().includes('Customer 0'));
  open(); type(''); assert.equal(options().length, 3);
  type('invalid');
  assert.equal(options().length, 0);
  assert.ok(dropdown.allText().includes('No quotation found'));
  input().props.onKeyDown({ key: 'Enter', preventDefault() {} });
  page.render(); assert.equal(selectorProps().value, 'QT-953456');
  type('532'); select('QT-532275');
  assert.ok(page.allText().includes('Customer 2'));
  open(); type('821');
  input().props.onKeyDown({ key: 'Enter', preventDefault() {} });
  page.render(); dropdown.render(selectorProps());
  assert.equal(selectorProps().value, 'QT-821050', 'Enter must select the first match without an All option');
  open(); select('QT-532275');
  const preview = page.find('div').find(node => node.props.ref && typeof node.props.ref === 'object');
  preview.props.ref.current = { cloneNode: () => ({ style: {}, outerHTML: `preview:${selectorProps().value}` }) };
  const buttons = page.find('button');
  await buttons.find(button => page.text(button) === 'Download Quotation').props.onClick();
  assert.deepEqual(savedFiles, ['Quotation_QT-532275.pdf']);
  assert.equal(renderedClones[0].outerHTML, 'preview:QT-532275');
  buttons.find(button => page.text(button) === 'Print Quotation').props.onClick();
  printWindow.onload();
  assert.equal(printed, 1); assert.ok(printHtml.includes('preview:QT-532275'));
  assert.equal(page.find('a')[0].props.to, '/admin/quotationEdit');
  assert.equal(apiCalls, 1, 'Selection should reuse the existing loaded data');
});

test('selector deduplicates preview IDs and retains the list-page defaults', () => {
  const dropdown = mount('QuotationIdSelect.jsx', { ids: ['QT-953456', 'QT-953456', 'QT-532275'], value: '', onChange() {} }, {}, {
    document: { addEventListener() {}, removeEventListener() {}, getElementById() {} },
  });
  dropdown.find('input')[0].props.onFocus(); dropdown.render();
  const options = dropdown.find('li').filter(node => node.props.role === 'option');
  assert.deepEqual(options.map(node => node.props.children), ['All Quotations', 'QT-953456', 'QT-532275']);
});
