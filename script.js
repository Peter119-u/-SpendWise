```javascript
// Monthly budget
let monthlyBudget = 0;

// Store expenses
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Get HTML elements
const budgetForm = document.getElementById("budget-form");
const expenseForm = document.getElementById("expense-form");

const budgetInput = document.getElementById("budget-input");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");

const budgetDisplay = document.getElementById("budget");
const expensesDisplay = document.getElementById("expenses");
const balanceDisplay = document.getElementById("balance");
const expenseList = document.getElementById("expense-list");

// Save expenses to local storage
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Update dashboard
function updateDashboard() {
    const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const remainingBalance = monthlyBudget - totalExpenses;

    budgetDisplay.textContent = `KSh ${monthlyBudget.toLocaleString()}`;
    expensesDisplay.textContent = `KSh ${totalExpenses.toLocaleString()}`;
    balanceDisplay.textContent = `KSh ${remainingBalance.toLocaleString()}`;

    renderExpenses();
}

// Display expenses
function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(expense.name)}</td>
            <td>${escapeHTML(expense.category)}</td>
            <td>KSh ${expense.amount.toLocaleString()}</td>
            <td>
                <button class="delete-btn" onclick="deleteExpense(${index})">
                    Delete
                </button>
            </td>
        `;

        expenseList.appendChild(row);
    });
}

// Protect the table from HTML input
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

// Set monthly budget
budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const amount = Number(budgetInput.value);

    if (!Number.isFinite(amount) || amount < 0) {
        alert("Please enter a valid budget.");
        return;
    }

    monthlyBudget = amount;

    localStorage.setItem("monthlyBudget", monthlyBudget);

    budgetInput.value = "";

    updateDashboard();
});

// Add new expense
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    if (!name || !Number.isFinite(amount) || amount <= 0 || !category) {
        alert("Please enter valid expense details.");
        return;
    }

    const newExpense = {
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(newExpense);

    saveExpenses();

    expenseForm.reset();

    updateDashboard();
});

// Delete expense
function deleteExpense(index) {
    expenses.splice(index, 1);

    saveExpenses();

    updateDashboard();
}

// Load saved budget
monthlyBudget = Number(localStorage.getItem("monthlyBudget")) || 0;

// Load dashboard when page opens
updateDashboard();
```
