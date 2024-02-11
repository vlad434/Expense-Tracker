const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//Create a entry
app.post("/entries", async (req, res) => {
  try {
    const { name, amount, currency, transaction_type, category } = req.body;
    const newEntry = await pool.query(
      "INSERT INTO entries (name, amount, currency, transaction_type, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, amount, currency, transaction_type, category]
    );
    res.json(newEntry.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//Get all entries
app.get("/entries", async (req, res) => {
  try {
    const allEntries = await pool.query("SELECT * FROM entries");
    res.json(allEntries.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//Get a single entry
app.get("/entries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await pool.query(
      "SELECT * FROM entries WHERE entry_id = $1",
      [id]
    );
    res.json(entry.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//Update a single entry
app.put("/entries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, currency, transaction_type, category } = req.body;
    const updateEntry = await pool.query(
      "UPDATE entries SET name = $1, amount = $2, currency = $3, transaction_type = $4, category = $5 WHERE entry_id = $6",
      [name, amount, currency, transaction_type, category, id]
    );

    res.json("Entry has been updated");
  } catch (error) {
    console.error(error.message);
  }
});

//Delete a single entry
app.delete("/entries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEntry = await pool.query(
      "DELETE FROM entries WHERE entry_id = $1",
      [id]
    );
    res.json("Entry has been deleted");
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
