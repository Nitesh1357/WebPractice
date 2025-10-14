// Get DOM elements
const balanceEl = document.getElementById('balance');
const incomeAmountEl = document.getElementById('income-amount');
const expenseAmountEl = document.getElementById('expense-amount');
const transactionListEl = document.getElementById('transaction-list');
const transactionFormEl = document.getElementById('transaction-form');
const descriptionEl = document.getElementById('description');
const amountEl = document.getElementById('amount');

// Initialize transactions from localStorage or empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Function to update localStorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Function to format amount as currency
function formatAmount(amount) {
    return '₹' + Math.abs(amount).toFixed(2);
}

// Function to update the balance summary
function updateBalance() {
    // Calculate total balance
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    
    // Calculate income and expenses
    const income = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    
    const expenses = transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    
    // Update DOM elements
    balanceEl.textContent = formatAmount(balance);
    incomeAmountEl.textContent = formatAmount(income);
    expenseAmountEl.textContent = formatAmount(Math.abs(expenses));
}

// Function to create a transaction DOM element
function createTransactionElement(transaction) {
    const li = document.createElement('li');
    li.classList.add('transaction');
    li.classList.add(transaction.amount > 0 ? 'income' : 'expense');
    
    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>${formatAmount(transaction.amount)}</span>
        <button onclick="removeTransaction(${transaction.id})">×</button>
    `;
    
    return li;
}

// Function to render all transactions
function renderTransactions() {
    transactionListEl.innerHTML = '';
    transactions.forEach(transaction => {
        transactionListEl.appendChild(createTransactionElement(transaction));
    });
    updateBalance();
}

// Function to add a new transaction
function addTransaction(e) {
    e.preventDefault();
    
    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);
    
    if (description === '' || isNaN(amount)) {
        alert('Please enter both description and amount');
        return;
    }
    
    const transaction = {
        id: Date.now(),
        description,
        amount
    };
    
    transactions.push(transaction);
    updateLocalStorage();
    renderTransactions();
    
    // Reset form
    descriptionEl.value = '';
    amountEl.value = '';
}

// Function to remove a transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    renderTransactions();
}

// Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
    });
});

// Subtract amount functionality
const subtractFormEl = document.getElementById('subtract-form');
const subtractDescriptionEl = document.getElementById('subtract-description');
const subtractAmountEl = document.getElementById('subtract-amount');

function subtractAmount(e) {
    e.preventDefault();
    
    const description = subtractDescriptionEl.value.trim();
    const amount = parseFloat(subtractAmountEl.value);
    
    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid description and positive amount');
        return;
    }
    
    const transaction = {
        id: Date.now(),
        description: description + ' (Subtracted)',
        amount: -amount // Make the amount negative to subtract
    };
    
    transactions.push(transaction);
    updateLocalStorage();
    renderTransactions();
    
    // Reset form
    subtractDescriptionEl.value = '';
    subtractAmountEl.value = '';
}

// Event listeners
transactionFormEl.addEventListener('submit', addTransaction);
subtractFormEl.addEventListener('submit', subtractAmount);

// Initial render
renderTransactions();