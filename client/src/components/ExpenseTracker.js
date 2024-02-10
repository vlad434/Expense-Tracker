import React, { useState } from "react";

export default function ExpenseTracker() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  // const [currency, setCurrency] = useState('');
  const [transactionType, setTransactionType] = useState("Expense");
  const [entries, setEntries] = useState([]);

  const [filteredEntries, setFilteredEntries] = useState([]);

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

  const handleRadioChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleSortBy = (e) => {
    e.preventDefault();
    if (e.target.value === "default") {
      setFilteredEntries(entries);
    } else {
      let filteredEntries = entries.filter(
        (entry) => entry.type === e.target.value
      );
      setFilteredEntries(filteredEntries);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      name: description,
      amount: amount,
      type: transactionType,
    };
    addTransaction(newTransaction);

    setDescription("");
    setAmount(0);
    setTransactionType("Expense");
  };

  return (
    <div className="tw-w-full tw-grid tw-items-center tw-justify-center tw-space-y-4">
      {console.log(entries, filteredEntries)}
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
        <button type="submit">Add transaction</button>
      </form>
      {/* End add transaction fields */}

      {/* Start transaction history */}
      <div
        className={`tw-border-2 tw-border-solid tw-rounded-md ${
          entries.length > 0 || filteredEntries.length > 0
            ? "tw-flex"
            : "tw-hidden"
        } tw-flex-col tw-items-center`}
      >
        <h2>Transactions History</h2>
        {/* Start sort transactions by */}
        <div>
          <label htmlFor="sort_by">Sort by:</label>
          <select name="sort_by" id="sort_by" onChange={handleSortBy}>
            <option value="default">- Select -</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        {/* End sort transactions by */}
        <div className="tw-space-y-2 tw-mb-2 tw-w-10/12">
          {(filteredEntries.length > 0 ? filteredEntries : entries).map(
            (item, index) => (
              <div
                key={index}
                className={`tw-grid tw-grid-cols-4 tw-rounded tw-py-1 ${
                  item.type === "Income" ? "tw-bg-green-400" : "tw-bg-red-400"
                }`}
              >
                <span className="tw-flex tw-items-center tw-justify-center">
                  {item.name}
                </span>
                <span className="tw-flex tw-items-center tw-justify-center">
                  {item.amount} RON
                </span>
                <span className="tw-flex tw-items-center tw-justify-center">
                  {item.type}
                </span>
                <span className="tw-flex tw-items-center tw-justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    onClick={() => deleteTransaction(item.id)}
                    className="tw-w-3 tw-h-3 tw-cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            )
          )}
        </div>
      </div>
      {/* End transaction history */}
    </div>
  );
}
