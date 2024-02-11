CREATE DATABASE expense_tracker;

CREATE TABLE entries(
    entry_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL,
    currency VARCHAR(255) NOT NULL,
    transaction_type VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    date_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);