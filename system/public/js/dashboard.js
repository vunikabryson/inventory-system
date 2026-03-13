// js/dashboard.js
document.addEventListener("DOMContentLoaded", () => {

  // --- Monthly Sales Line Chart ---
  const salesCtx = document.getElementById('salesChart').getContext('2d');
  const salesChart = new Chart(salesCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Sales',
        data: [1200, 1500, 1800, 1400, 1700, 2100, 2300, 2000, 1900, 2200, 2500, 2700],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false },
      },
      scales: {
        y: { beginAtZero: true },
        x: { grid: { display: false } }
      }
    }
  });

  // --- Top 3 Selling Products Doughnut Chart ---
  const topProductsCtx = document.getElementById('topProductsChart').getContext('2d');
  const topProductsChart = new Chart(topProductsCtx, {
    type: 'doughnut',
    data: {
      labels: ['Product A', 'Product B', 'Product C'],
      datasets: [{
        data: [45, 30, 25],
        backgroundColor: ['#4f46e5', '#3b82f6', '#10b981'],
        borderWidth: 0,
      }]
    },
    options: {
      responsive: true,
      cutout: '70%',
      plugins: {
        legend: { position: 'right' }
      }
    }
  });

  // --- Expenses Bar Chart ---
  const expenseCtx = document.getElementById('expenseChart').getContext('2d');
  const expenseChart = new Chart(expenseCtx, {
    type: 'bar',
    data: {
      labels: ['Rent', 'Utilities', 'Salaries', 'Marketing', 'Misc'],
      datasets: [{
        label: 'Expenses',
        data: [800, 300, 1200, 450, 150],
        backgroundColor: '#ef4444',
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true },
        x: { grid: { display: false } }
      }
    }
  });

});