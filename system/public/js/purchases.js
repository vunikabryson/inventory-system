let purchases = [];

// Preload products & suppliers for demo
const products = ["Product A", "Product B", "Product C"];
const suppliers = ["Supplier X", "Supplier Y", "Supplier Z"];

// Populate select options
function populateSelects() {
  const productSelect = document.getElementById("purchaseProduct");
  const supplierSelect = document.getElementById("purchaseSupplier");

  products.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    productSelect.appendChild(opt);
  });

  suppliers.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    supplierSelect.appendChild(opt);
  });
}

// Add Purchase
function addPurchase() {
  const product = document.getElementById("purchaseProduct").value;
  const supplier = document.getElementById("purchaseSupplier").value;
  const qty = parseInt(document.getElementById("purchaseQty").value);
  const price = parseFloat(document.getElementById("purchasePrice").value);
  const date = document.getElementById("purchaseDate").value;

  if(!product || !supplier || !qty || !price || !date || qty<=0 || price<=0){
    alert("Please fill all fields with valid data");
    return;
  }

  purchases.push({ product, supplier, qty, price, date });
  renderPurchases();

  // Clear form
  document.getElementById("purchaseProduct").value = "";
  document.getElementById("purchaseSupplier").value = "";
  document.getElementById("purchaseQty").value = "";
  document.getElementById("purchasePrice").value = "";
  document.getElementById("purchaseDate").value = "";
}

// Render Table
function renderPurchases() {
  const tbody = document.getElementById("purchaseList");
  tbody.innerHTML = "";
  let total = 0;

  purchases.forEach((p, i) => {
    const itemTotal = p.qty * p.price;
    total += itemTotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.product}</td>
      <td>${p.supplier}</td>
      <td>${p.qty}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td>$${itemTotal.toFixed(2)}</td>
      <td>${p.date}</td>
      <td><button class="delete-btn" onclick="deletePurchase(${i})">🗑️</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("purchaseTotal").textContent = total.toFixed(2);
}

// Delete Purchase
function deletePurchase(index) {
  if(confirm("Are you sure you want to delete this purchase?")){
    purchases.splice(index,1);
    renderPurchases();
  }
}

// Initialize selects on page load
document.addEventListener("DOMContentLoaded", populateSelects);