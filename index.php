
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Tracker</title>

    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <div>
                <p class="subtitle">PERSONAL FINANCE</p>
                <h1>Expense Tracker</h1>
                 <p class="description">Uppala Viswendra.</p>
            </div>
            <div class="header-icon">₹</div>
        </header>

        <section class="total-card">
            <p>Total Expenses</p>
            <h2>₹<span id="total-amount">0.00</span></h2>
            <span class="total-note">Your spending overview</span>
        </section>

        <section class="form-card">
            <h2 id="form-title">Add New Expense</h2>

            <form id="expense-form">
                <input type="hidden" id="expense-id">

                <div class="form-group">
                    <label for="expense-name">Expense Name</label>
                    <input type="text" id="expense-name"
                        placeholder="e.g. Groceries" required maxlength="100">
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="expense-amount">Amount (₹)</label>
                        <input type="number" id="expense-amount"
                            placeholder="0.00" min="0.01" step="0.01" required>
                    </div>

                    <div class="form-group">
                        <label for="expense-category">Category</label>
                        <select id="expense-category" required>
    <option value="" disabled selected>Select Category</option>
    <option value="Food">🍔 Food</option>
    <option value="Transport">🚗 Transport</option>
    <option value="Entertainment">🎬 Entertainment</option>
    <option value="Shopping">🛍️ Shopping</option>
    <option value="Groceries">🛒 Groceries</option>
    <option value="Rent">🏠 Rent</option>
    <option value="Bills">🧾 Bills</option>
    <option value="Electricity">💡 Electricity</option>
    <option value="Healthcare">🏥 Healthcare</option>
    <option value="Education">📚 Education</option>
    <option value="Travel">✈️ Travel</option>
    <option value="Fuel">⛽ Fuel</option>
    <option value="Mobile Recharge">📱 Mobile Recharge</option>
    <option value="Internet">🌐 Internet</option>
    <option value="Entertainment Subscriptions">📺 Subscriptions</option>
    <option value="Personal Care">🧴 Personal Care</option>
    <option value="Fitness">🏋️ Fitness</option>
    <option value="Gifts">🎁 Gifts</option>
    <option value="EMI">💳 EMI</option>
    <option value="Other">📦 Other</option>
</select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="expense-date">Date</label>
                    <input type="date" id="expense-date" required>
                </div>

                <div class="form-actions">
                    <button type="submit" id="submit-btn" class="primary-btn">
                        + Add Expense
                    </button>
                    <button type="button" id="cancel-btn" class="cancel-btn" hidden>
                        Cancel
                    </button>
                </div>
            </form>
        </section>

        <section class="list-section">
            <div class="list-heading">
                <div>
                    <h2>Transactions</h2>
                    <p>Your recent expenses</p>
                </div>

                <select id="filter-category" aria-label="Filter by category">
                    <option value="All">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div id="expense-list" class="expense-list"></div>
            <p id="empty-message" class="empty-message">
                No expenses yet. Add your first expense above!
            </p>
        </section>
    </div>

    <script src="script.js"></script>
</body>
</html>
