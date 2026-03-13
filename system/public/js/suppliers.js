// ================================
// SUPPLIERS PAGE JAVASCRIPT
// ================================

// Load suppliers and notifications when page opens
document.addEventListener("DOMContentLoaded", function () {
  renderSuppliers();
  renderNotifications();
});


// ================================
// GET & SAVE SUPPLIERS
// ================================
function getSuppliers() {
  return JSON.parse(localStorage.getItem("suppliers")) || [];
}

function saveSuppliers(suppliers) {
  localStorage.setItem("suppliers", JSON.stringify(suppliers));
}


// ================================
// GET & SAVE NOTIFICATIONS
// ================================
function getNotifications() {
  return JSON.parse(localStorage.getItem("notifications")) || [];
}

function saveNotifications(notifications) {
  localStorage.setItem("notifications", JSON.stringify(notifications));
}

function addNotification(message) {
  let notifications = getNotifications();
  notifications.unshift({
    message: message,
    time: new Date().toLocaleString()
  });
  saveNotifications(notifications);
  renderNotifications();
}

function renderNotifications() {
  let notifications = getNotifications();
  let list = document.getElementById("notificationList");
  let count = document.getElementById("notificationCount");

  if (!list || !count) return;

  list.innerHTML = "";
  if (notifications.length === 0) {
    list.innerHTML = "<li>No notifications</li>";
  } else {
    notifications.slice(0,10).forEach(n => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${n.message}</strong><br><small>${n.time}</small>`;
      list.appendChild(li);
    });
  }
  count.textContent = notifications.length;
}

function clearNotifications() {
  localStorage.removeItem("notifications");
  renderNotifications();
}


// ================================
// ADD SUPPLIER
// ================================
function addSupplier() {
  const name = document.getElementById("supName").value.trim();
  const phone = document.getElementById("supPhone").value.trim();
  const email = document.getElementById("supEmail").value.trim();
  const statusSelect = document.getElementById("supStatus");
  const status = statusSelect ? statusSelect.value : "Active";

  if (!name || !phone || !email) {
    alert("Please fill in all fields");
    return;
  }

  let suppliers = getSuppliers();

  suppliers.push({ name, phone, email, status });

  saveSuppliers(suppliers);

  addNotification("📦 New supplier added: " + name);

  // Clear form
  document.getElementById("supName").value = "";
  document.getElementById("supPhone").value = "";
  document.getElementById("supEmail").value = "";
  if(statusSelect) statusSelect.value = "Active";

  renderSuppliers();
}


// ================================
// RENDER SUPPLIERS TABLE
// ================================
function renderSuppliers() {
  const suppliers = getSuppliers();
  const list = document.getElementById("suppliersList");
  if (!list) return;

  list.innerHTML = "";

  suppliers.forEach((sup, index) => {
    const statusClass = sup.status === "Active" ? "status-active" : "status-inactive";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${sup.name}</td>
      <td>${sup.phone}</td>
      <td>${sup.email}</td>
      <td>
        <span class="${statusClass}" onclick="toggleSupplierStatus(${index})" style="cursor:pointer;">
          ${sup.status}
        </span>
      </td>
      <td>
        <div class="actions">
          <span class="action-btn" onclick="viewSupplier(${index})">👁️</span>
          <span class="action-btn" onclick="editSupplier(${index})">✏️</span>
          <span class="action-btn" onclick="deleteSupplier(${index})">🗑️</span>
        </div>
      </td>
    `;
    list.appendChild(row);
  });
}


// ================================
// VIEW SUPPLIER
// ================================
function viewSupplier(index) {
  const suppliers = getSuppliers();
  const s = suppliers[index];
  alert(`Supplier Info:\n\nName: ${s.name}\nPhone: ${s.phone}\nEmail: ${s.email}\nStatus: ${s.status}`);
}


// ================================
// EDIT SUPPLIER
// ================================
function editSupplier(index) {
  let suppliers = getSuppliers();
  let sup = suppliers[index];

  const newName = prompt("Edit Name", sup.name);
  const newPhone = prompt("Edit Phone", sup.phone);
  const newEmail = prompt("Edit Email", sup.email);

  if(newName && newPhone && newEmail) {
    suppliers[index] = {
      name: newName,
      phone: newPhone,
      email: newEmail,
      status: sup.status
    };
    saveSuppliers(suppliers);
    renderSuppliers();
    addNotification("✏️ Supplier edited: " + newName);
  }
}


// ================================
// DELETE SUPPLIER
// ================================
function deleteSupplier(index) {
  let suppliers = getSuppliers();
  if (confirm("Are you sure you want to delete this supplier?")) {
    const name = suppliers[index].name;
    suppliers.splice(index, 1);
    saveSuppliers(suppliers);
    renderSuppliers();
    addNotification("🗑️ Supplier deleted: " + name);
  }
}


// ================================
// TOGGLE SUPPLIER STATUS
// ================================
function toggleSupplierStatus(index) {
  let suppliers = getSuppliers();
  let s = suppliers[index];
  s.status = s.status === "Active" ? "Inactive" : "Active";
  saveSuppliers(suppliers);
  renderSuppliers();
  addNotification(`🔄 Supplier status updated: ${s.name} is now ${s.status}`);
}