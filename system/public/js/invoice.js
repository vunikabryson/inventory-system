// DOM Elements
const invoiceCustomer = document.getElementById('invoiceCustomer');
const invoiceProduct = document.getElementById('invoiceProduct');
const invoiceQty = document.getElementById('invoiceQty');
const invoiceItems = document.getElementById('invoiceItems');
const invoiceTotalEl = document.getElementById('invoiceTotal');

let invoiceList = [];

// Load customers and products into dropdowns
function loadInvoiceData() {
  const customers = JSON.parse(localStorage.getItem('customers')) || [];
  const products = JSON.parse(localStorage.getItem('products')) || [];

  customers.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = c.name;
    invoiceCustomer.appendChild(opt);
  });

  products.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.name;
    opt.textContent = `${p.name} ($${p.price.toFixed(2)})`;
    invoiceProduct.appendChild(opt);
  });
}

// Add item to invoice
function addInvoiceItem() {
  const productName = invoiceProduct.value;
  const qty = parseInt(invoiceQty.value);

  if (!productName) return alert('Select a product.');
  if (isNaN(qty) || qty <= 0) return alert('Enter valid quantity.');

  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products.find(p => p.name === productName);

  const total = product.price * qty;

  invoiceList.push({ product: productName, price: product.price, qty, total });
  renderInvoiceItems();
}

// Render table
function renderInvoiceItems() {
  invoiceItems.innerHTML = '';
  let totalSum = 0;

  invoiceList.forEach((item, index) => {
    totalSum += item.total;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.product}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.qty}</td>
      <td>$${item.total.toFixed(2)}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    `;
    invoiceItems.appendChild(row);
  });

  invoiceTotalEl.textContent = totalSum.toFixed(2);
}

// Remove item
function removeItem(index) {
  invoiceList.splice(index, 1);
  renderInvoiceItems();
}

function generateInvoice() {
  const customer = invoiceCustomer.value;
  if (!customer) return alert('Select a customer.');
  if (invoiceList.length === 0) return alert('Add items to invoice.');

  const invoiceData = {
    customer,
    items: invoiceList,
    total: invoiceList.reduce((sum, i) => sum + i.total, 0),
    date: new Date().toLocaleString()
  };

  // Save invoice to localStorage for printable page
  localStorage.setItem('lastInvoice', JSON.stringify(invoiceData));

  // Open printable invoice in new tab
  window.open('invoice_print.html', '_blank');

  // Optional: show confirmation
  alert(`Invoice for ${customer} generated. Total: $${invoiceData.total.toFixed(2)}`);

  // Clear invoice form for next invoice
  invoiceList = [];
  renderInvoiceItems();
  invoiceCustomer.value = '';
  invoiceProduct.value = '';
  invoiceQty.value = '';
}