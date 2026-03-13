// ================================
// EMPLOYEES PAGE JS
// ================================

// Load employees from localStorage when page loads
document.addEventListener("DOMContentLoaded", () => {
  renderEmployees();
});

// Get employees array from localStorage
function getEmployees() {
  return JSON.parse(localStorage.getItem("employees")) || [];
}

// Save employees array to localStorage
function saveEmployees(employees) {
  localStorage.setItem("employees", JSON.stringify(employees));
}

// Add a new employee
function addEmployee() {
  const name = document.getElementById("empName").value.trim();
  const position = document.getElementById("empPosition").value.trim();
  const email = document.getElementById("empEmail").value.trim();
  const phone = document.getElementById("empPhone").value.trim();

  if (!name || !position || !email || !phone) {
    alert("Please fill all fields");
    return;
  }

  // Add new employee to array
  const employees = getEmployees();
  employees.push({ name, position, email, phone });
  saveEmployees(employees);

  // Clear form fields
  document.getElementById("empName").value = "";
  document.getElementById("empPosition").value = "";
  document.getElementById("empEmail").value = "";
  document.getElementById("empPhone").value = "";

  renderEmployees();
}

// Render employees table
function renderEmployees() {
  const employees = getEmployees();
  const tbody = document.getElementById("employeeList");
  tbody.innerHTML = "";

  employees.forEach((emp, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${emp.name}</td>
      <td>${emp.position}</td>
      <td>${emp.email}</td>
      <td>${emp.phone}</td>
      <td>
        <button class="action-btn" onclick="editEmployee(${index})">✏️</button>
        <button class="action-btn" onclick="deleteEmployee(${index})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Edit employee
function editEmployee(index) {
  const employees = getEmployees();
  const emp = employees[index];

  const newName = prompt("Edit Name:", emp.name);
  const newPosition = prompt("Edit Position:", emp.position);
  const newEmail = prompt("Edit Email:", emp.email);
  const newPhone = prompt("Edit Phone:", emp.phone);

  if (newName && newPosition && newEmail && newPhone) {
    employees[index] = { name: newName, position: newPosition, email: newEmail, phone: newPhone };
    saveEmployees(employees);
    renderEmployees();
  }
}

// Delete employee
function deleteEmployee(index) {
  if (confirm("Are you sure you want to delete this employee?")) {
    const employees = getEmployees();
    employees.splice(index, 1);
    saveEmployees(employees);
    renderEmployees();
  }
}