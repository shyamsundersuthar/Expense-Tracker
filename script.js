
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("expense-form");
    const nameInput = document.getElementById("expense-name");
    const amountInput = document.getElementById("expense-amount");
    const categoryInput = document.getElementById("expense-category");
    const dateInput = document.getElementById("expense-date");
    const idInput = document.getElementById("expense-id");

    const list = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filter = document.getElementById("filter-category");
    const emptyMessage = document.getElementById("empty-message");
    const submitBtn = document.getElementById("submit-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const formTitle = document.getElementById("form-title");

    const STORAGE_KEY = "expenseTrackerData";
    const categories = [
    "Food", "Transport", "Entertainment", "Shopping",
    "Groceries", "Rent", "Bills", "Electricity",
    "Healthcare", "Education", "Travel", "Fuel",
    "Mobile Recharge", "Internet", "Entertainment Subscriptions",
    "Personal Care", "Fitness", "Gifts", "EMI", "Other"
];

    let expenses = [];

    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        if (Array.isArray(saved)) {
            expenses = saved.filter(e =>
                e &&
                Number.isFinite(Number(e.id)) &&
                typeof e.name === "string" &&
                Number.isFinite(Number(e.amount)) &&
                Number(e.amount) > 0 &&
                categories.includes(e.category) &&
                typeof e.date === "string"
            ).map(e => ({
                ...e,
                id: Number(e.id),
                amount: Number(e.amount)
            }));
        }
    } catch {
        expenses = [];
    }

    function saveExpenses() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
        } catch {
            alert("Could not save data on this device.");
        }
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    function formatMoney(amount) {
        return Number(amount).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function render() {
        const selected = filter.value;
        const visible = selected === "All"
            ? expenses
            : expenses.filter(e => e.category === selected);

        list.innerHTML = "";

        visible.slice().reverse().forEach(expense => {
            const item = document.createElement("article");
            item.className = "expense-item";

            item.innerHTML = `
                <div class="expense-info">
                    <div class="expense-name">${escapeHTML(expense.name)}</div>
                    <div class="expense-meta">
                        <span class="category-tag">${escapeHTML(expense.category)}</span>
                        <span>${escapeHTML(expense.date)}</span>
                    </div>
                </div>
                <div class="expense-right">
                    <div class="expense-amount">₹${formatMoney(expense.amount)}</div>
                    <div class="expense-buttons">
                        <button type="button" class="edit-btn"
                            data-action="edit" data-id="${expense.id}">Edit</button>
                        <button type="button" class="delete-btn"
                            data-action="delete" data-id="${expense.id}">Delete</button>
                    </div>
                </div>
            `;

            list.appendChild(item);
        });

        const total = visible.reduce((sum, e) => sum + e.amount, 0);
        totalAmount.textContent = formatMoney(total);
        emptyMessage.hidden = visible.length !== 0;
    }

    function resetForm() {
        form.reset();
        idInput.value = "";
        dateInput.value = new Date().toLocaleDateString("en-CA");
        formTitle.textContent = "Add New Expense";
        submitBtn.textContent = "+ Add Expense";
        cancelBtn.hidden = true;
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const amount = Number(amountInput.value);
        const category = categoryInput.value;
        const date = dateInput.value;

        if (!name || !Number.isFinite(amount) || amount <= 0 ||
            !categories.includes(category) || !date) {
            alert("Please enter valid expense details.");
            return;
        }

        const existingId = idInput.value ? Number(idInput.value) : null;

        if (existingId !== null) {
            const index = expenses.findIndex(e => e.id === existingId);
            if (index !== -1) {
                expenses[index] = {
                    id: existingId, name, amount, category, date
                };
            }
        } else {
            expenses.push({
                id: Date.now(),
                name,
                amount,
                category,
                date
            });
        }

        saveExpenses();
        render();
        resetForm();
    });

    list.addEventListener("click", event => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;

        const id = Number(button.dataset.id);
        const expense = expenses.find(e => e.id === id);
        if (!expense) return;

        if (button.dataset.action === "edit") {
            idInput.value = expense.id;
            nameInput.value = expense.name;
            amountInput.value = expense.amount;
            categoryInput.value = expense.category;
            dateInput.value = expense.date;

            formTitle.textContent = "Edit Expense";
            submitBtn.textContent = "Save Changes";
            cancelBtn.hidden = false;

            form.scrollIntoView({ behavior: "smooth", block: "start" });
            nameInput.focus();
        }

        if (button.dataset.action === "delete") {
            if (!confirm(`Delete "${expense.name}"?`)) return;

            expenses = expenses.filter(e => e.id !== id);

            if (Number(idInput.value) === id) {
                resetForm();
            }

            saveExpenses();
            render();
        }
    });

    cancelBtn.addEventListener("click", resetForm);

    filter.addEventListener("change", render);

    resetForm();
    render();
});