// ================================
// MINI POS JS
// ================================

// Load products from localStorage
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

// Cart array
let cart = [];

// Auto-load products into dropdown
function loadProducts() {
  const select = document.getElementById("productSelect");
  select.innerHTML = `<option value="">Select Product</option>`;
  getProducts().forEach((p, index) => {
    select.innerHTML += `<option value="${index}">${p.name} - $${p.price.toFixed(2)}</option>`;
  });
}

// Add selected product to cart
function addToCart() {
  const select = document.getElementById("productSelect");
  const qtyInput = document.getElementById("saleQty");
  const index = select.value;
  const qty = parseFloat(qtyInput.value);

  if(index === "" || !qty || qty <= 0) {
    alert("Select product and enter valid quantity");
    return;
  }

  const products = getProducts();
  const product = products[index];
  const total = product.price * qty;

  cart.push({ name: product.name, price: product.price, qty, total });
  qtyInput.value = "";
  select.value = "";

  renderCart();
}

// Render cart table
function renderCart() {
  const tbody = document.getElementById("cartList");
  tbody.innerHTML = "";
  let grandTotal = 0;

  cart.forEach((item, i) => {
    grandTotal += item.total;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${item.qty}</td>
      <td>${item.total.toFixed(2)}</td>
      <td><button onclick="removeCartItem(${i})">❌</button></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);
}

// Remove item from cart
function removeCartItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Finalize sale
function finalizeSale() {
  if(cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  const date = new Date().toLocaleString();
  cart.forEach(item => {
    sales.push({ product: item.name, qty: item.qty, total: item.total, date });
  });
  localStorage.setItem("sales", JSON.stringify(sales));
  cart = [];
  renderCart();
  alert("Sale recorded successfully!");
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});