let expenses = [];

function addExpense() {
  const date = document.getElementById("expenseDate").value;
  const category = document.getElementById("expenseCategory").value;
  const description = document.getElementById("expenseDescription").value.trim();
  const amount = parseFloat(document.getElementById("expenseAmount").value);

  if(!date || !category || !description || !amount || amount <= 0) {
    alert("Please fill all fields with valid data");
    return;
  }

  expenses.push({ date, category, description, amount });
  renderExpenses();

  document.getElementById("expenseDate").value = "";
  document.getElementById("expenseCategory").value = "";
  document.getElementById("expenseDescription").value = "";
  document.getElementById("expenseAmount").value = "";
}

function renderExpenses() {
  const tbody = document.getElementById("expenseList");
  tbody.innerHTML = "";
  let total = 0;

  expenses.forEach((exp, index) => {
    total += exp.amount;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index+1}</td>
      <td>${exp.date}</td>
      <td>${exp.category}</td>
      <td>${exp.description}</td>
      <td>${exp.amount.toFixed(2)}</td>
      <td><button class="delete-btn" onclick="deleteExpense(${index})">🗑️</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("expenseTotal").textContent = total.toFixed(2);
}

function deleteExpense(index) {
  if(confirm("Are you sure you want to delete this expense?")) {
    expenses.splice(index,1);
    renderExpenses();
  }
}