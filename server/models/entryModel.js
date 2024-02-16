const pool = require("../db/db");

class EntryModel {
  async queryCreateEntry(entryData) {
    try {
      const { name, amount, currency, transaction_type, category } = entryData;
      const newEntry = await pool.query(
        "INSERT INTO entries (name, amount, currency, transaction_type, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, amount, currency, transaction_type, category]
      );
      return newEntry.rows[0];
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async queryAllEntries() {
    try {
      const allEntries = await pool.query("SELECT * FROM entries");
      return allEntries.rows;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async querySingleEntry(id) {
    try {
      const entry = await pool.query(
        "SELECT * FROM entries WHERE entry_id = $1",
        [id]
      );
      return entry.rows[0];
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async queryUpdateEntry(id, entryData) {
    try {
      const { name, amount, currency, transaction_type, category } = entryData;
      const updateEntry = await pool.query(
        "UPDATE entries SET name = $1, amount = $2, currency = $3, transaction_type = $4, category = $5 WHERE entry_id = $6",
        [name, amount, currency, transaction_type, category, id]
      );

      return "Entry has been updated";
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async queryDeleteEntry(id) {
    try {
      const deleteEntry = await pool.query(
        "DELETE FROM entries WHERE entry_id = $1",
        [id]
      );
      return "Entry has been deleted";
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
}

module.exports = new EntryModel();
