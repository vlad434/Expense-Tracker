import React, { useState } from "react";

export default function ExpenseTracker() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("default");
  const [transactionType, setTransactionType] = useState("Expense");
  const [selectedCategory, setSelectedCategory] = useState("default");
  const [entries, setEntries] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const addTransaction = (value) => {
    setEntries([...entries, value]);
    if (value.type === "Income") {
      setIncome(income + parseFloat(value.amount));
    } else {
      setExpenses(expenses + parseFloat(value.amount));
    }
    setBalance(
      balance +
        (value.type === "Income"
          ? parseFloat(value.amount)
          : -parseFloat(value.amount))
    );
  };

  const deleteTransaction = (id) => {
    setEntries(entries.filter((transaction) => transaction.id !== id));
  };

  const editTransaction = (id) => {
    console.log("edit transaction", id);
    setIsEditing(true);
    // setEntries(entries.filter((transaction) => transaction.id !== id));
  };

  const resetFields = () => {
    setDescription("");
    setAmount(0);
    setCurrency("default");
    setTransactionType("Expense");
    setSelectedCategory("default");
  };

  const handleRadioChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleSortByCategory = (e) => {
    e.preventDefault();
    if (e.target.value === "default") {
      setFilteredCategories(entries);
    } else {
      let filteredCategories = entries.filter(
        (entry) => entry.category === e.target.value
      );
      setFilteredCategories(filteredCategories);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formIsValid =
      description !== "" &&
      (amount !== 0 || amount !== "") &&
      selectedCategory !== "default";

    if (formIsValid) {
      let newTransaction = {
        id: Math.floor(Math.random() * 100000000),
        name: description,
        amount: amount,
        currency: currency,
        type: transactionType,
        category: selectedCategory,
      };
      addTransaction(newTransaction);
      resetFields();
    } else {
      console.log("Form is not valid. Please fill in all fields.");
    }
  };

  return (
    <div className="tw-w-full tw-grid tw-items-center tw-justify-center tw-space-y-4">
      <div className="tw-grid">
        <span>Balance: {balance}</span>
        <span>Income: {income}</span>
        <span>Expenses: {expenses}</span>
      </div>
      {/* Start add transaction fields */}
      <form className="tw-flex" onSubmit={onSubmit}>
        <input
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          id="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          name="currency"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="default">- Currency -</option>
          <option value="€">€</option>
          <option value="$">$</option>
          <option value="£">£</option>
          <option value="RON">RON</option>
        </select>
        <div>
          <input
            type="radio"
            id="Expense"
            value="Expense"
            checked={transactionType === "Expense"}
            onChange={handleRadioChange}
          />
          <label htmlFor="Expense">Expense</label>
          <input
            type="radio"
            id="Income"
            value="Income"
            checked={transactionType === "Income"}
            onChange={handleRadioChange}
          />
          <label htmlFor="Income">Income</label>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="default">- Category -</option>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Medical">Medical</option>
            <option value="Economy">Economy</option>
          </select>
        </div>
        <button type="submit">Add transaction</button>
      </form>
      {/* End add transaction fields */}

      {/* Start transaction history */}
      <div
        className={`tw-border-2 tw-border-solid tw-rounded-md ${
          entries.length > 0 || filteredCategories.length > 0
            ? "tw-flex"
            : "tw-hidden"
        } tw-flex-col tw-items-center`}
      >
        <h2>Transactions History</h2>

        {/* Start sort transactions by category*/}
        <div>
          <label htmlFor="sort_by">Sort by:</label>
          <select name="sort_by" id="sort_by" onChange={handleSortByCategory}>
            <option value="default">- Category -</option>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Medical">Medical</option>
            <option value="Economy">Economy</option>
          </select>
        </div>
        {/* End sort transactions by category*/}
        <div className={`tw-space-y-2 tw-mb-2 tw-w-10/12`}>
          {(filteredCategories.length > 0 ? filteredCategories : entries).map(
            (item, index) => (
              <div
                key={index}
                className={`tw-grid tw-grid-cols-4 tw-rounded tw-py-1 ${
                  item.type === "Income" ? "tw-bg-green-400" : "tw-bg-red-400"
                }`}
              >
                {isEditing ? (
                  <p>edit</p>
                ) : (
                  <>
                    <span className="tw-flex tw-items-center tw-justify-center">
                      {item.name}
                    </span>
                    <span className="tw-flex tw-items-center tw-justify-center">
                      {item.amount} {item.currency}
                    </span>
                    <span className="tw-flex tw-items-center tw-justify-center">
                      {item.category}
                    </span>
                    <span className="tw-flex tw-items-center tw-justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        onClick={() => editTransaction(item.id)}
                        className="tw-w-5 tw-h-5 tw-cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        onClick={() => deleteTransaction(item.id)}
                        className="tw-w-5 tw-h-5 tw-cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
      {/* End transaction history */}
    </div>
  );
}
