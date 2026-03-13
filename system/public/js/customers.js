// ================================
// CUSTOMERS PAGE JAVASCRIPT
// ================================

// Load customers when page opens
document.addEventListener("DOMContentLoaded", function () {
  renderCustomers();
  renderNotifications();
});


// ================================
// GET & SAVE CUSTOMERS
// ================================
function getCustomers() {
  return JSON.parse(localStorage.getItem("customers")) || [];
}

function saveCustomers(customers) {
  localStorage.setItem("customers", JSON.stringify(customers));
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
// ADD CUSTOMER
// ================================
function addCustomer() {
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const email = document.getElementById("customerEmail").value.trim();
  const statusSelect = document.getElementById("customerStatus"); // optional dropdown
  const status = statusSelect ? statusSelect.value : "Active";

  if (!name || !phone || !email) {
    alert("Please fill in all fields");
    return;
  }

  let customers = getCustomers();

  customers.push({ name, contact: phone, email, status });

  saveCustomers(customers);

  addNotification("👤 New customer added: " + name);

  // Clear form
  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("customerEmail").value = "";
  if(statusSelect) statusSelect.value = "Active";

  renderCustomers();
}


// ================================
// RENDER CUSTOMERS TABLE
// ================================
function renderCustomers() {
  const customers = getCustomers();
  const list = document.getElementById("customersList");
  if (!list) return;

  list.innerHTML = "";

  customers.forEach((customer, index) => {
    const statusClass = customer.status === "Active" ? "status-active" : "status-inactive";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${customer.name}</td>
      <td>${customer.contact}</td>
      <td>${customer.email}</td>
      <td>
        <span class="${statusClass}" onclick="toggleCustomerStatus(${index})" style="cursor:pointer;">
          ${customer.status}
        </span>
      </td>
      <td>
        <div class="actions">
          <span class="action-btn" onclick="viewCustomer(${index})">👁️</span>
          <span class="action-btn" onclick="editCustomer(${index})">✏️</span>
          <span class="action-btn" onclick="deleteCustomer(${index})">🗑️</span>
        </div>
      </td>
    `;
    list.appendChild(row);
  });
}


// ================================
// VIEW CUSTOMER
// ================================
function viewCustomer(index) {
  const customers = getCustomers();
  const c = customers[index];
  alert(`Customer Info:\n\nName: ${c.name}\nPhone: ${c.contact}\nEmail: ${c.email}\nStatus: ${c.status}`);
}


// ================================
// EDIT CUSTOMER
// ================================
function editCustomer(index) {
  let customers = getCustomers();
  let customer = customers[index];

  const newName = prompt("Edit Name", customer.name);
  const newPhone = prompt("Edit Phone", customer.contact);
  const newEmail = prompt("Edit Email", customer.email);

  if(newName && newPhone && newEmail) {
    customers[index] = {
      name: newName,
      contact: newPhone,
      email: newEmail,
      status: customer.status
    };
    saveCustomers(customers);
    renderCustomers();
  }
}


// ================================
// DELETE CUSTOMER
// ================================
function deleteCustomer(index) {
  let customers = getCustomers();
  if (confirm("Are you sure you want to delete this customer?")) {
    customers.splice(index, 1);
    saveCustomers(customers);
    renderCustomers();
  }
}


// ================================
// TOGGLE CUSTOMER STATUS
// ================================
function toggleCustomerStatus(index) {
  let customers = getCustomers();
  let c = customers[index];
  c.status = c.status === "Active" ? "Inactive" : "Active";
  saveCustomers(customers);
  renderCustomers();
}