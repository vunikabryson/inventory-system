document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expenseForm');
  const expensesTableBody = document.getElementById('expensesTableBody');

  // Load existing expenses from localStorage
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  renderExpensesTable();

  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('expenseName').value.trim();
    const type = document.getElementById('expenseType').value;
    const auth = document.getElementById('expenseAuth').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const date = document.getElementById('expenseDate').value;

    if (!name || !type || !auth || !amount || !date) return;

    expenses.push({ name, type, auth, amount, date });

    // Save to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    renderExpensesTable();
    expenseForm.reset();
  });

  function renderExpensesTable() {
    expensesTableBody.innerHTML = '';

    if (expenses.length === 0) {
      expensesTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No expenses added yet</td></tr>`;
      return;
    }

    let total = 0;

    expenses.forEach((exp, index) => {
      total += exp.amount;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${exp.name}</td>
        <td>${exp.type}</td>
        <td>${exp.auth}</td>
        <td>$${exp.amount.toFixed(2)}</td>
        <td>${exp.date}</td>
        <td style="text-align:center;">
          <svg onclick="editExpense(${index})" xmlns="http://www.w3.org/2000/svg" class="icon action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 11l6-6m2 2l-6 6m-2 2H5v-4l4-4z"/>
          </svg>
          <svg onclick="deleteExpense(${index})" xmlns="http://www.w3.org/2000/svg" class="icon action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </td>
      `;
      expensesTableBody.appendChild(tr);
    });

    // Show total
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
      <td colspan="3" style="text-align:right; font-weight:bold;">Total:</td>
      <td colspan="3" style="text-align:left; font-weight:bold;">$${total.toFixed(2)}</td>
    `;
    expensesTableBody.appendChild(totalRow);
  }

  // Edit & Delete functions
  window.editExpense = function(index) {
    const exp = expenses[index];
    document.getElementById('expenseName').value = exp.name;
    document.getElementById('expenseType').value = exp.type;
    document.getElementById('expenseAuth').value = exp.auth;
    document.getElementById('expenseAmount').value = exp.amount;
    document.getElementById('expenseDate').value = exp.date;

    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpensesTable();
  }

  window.deleteExpense = function(index) {
    if (confirm('Delete this expense?')) {
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpensesTable();
    }
  }
});