const entryModel = require("../models/entryModel");

class EntryController {
  async createEntry(req, res) {
    try {
      const { name, amount, currency, transaction_type, category } = req.body;
      const newEntry = await entryModel.queryCreateEntry({
        name,
        amount,
        currency,
        transaction_type,
        category,
      });
      res.json(newEntry);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllEntries(req, res) {
    try {
      const allEntries = await entryModel.queryAllEntries();
      res.json(allEntries);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getSingleEntry(req, res) {
    try {
      const { id } = req.params;
      const entry = await entryModel.querySingleEntry(id);
      if (!entry) {
        return res.status(404).json({ error: "Entry not found" });
      }
      res.json(entry);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateEntry(req, res) {
    try {
      const { id } = req.params;
      const { name, amount, currency, transaction_type, category } = req.body;
      const updateMessage = await entryModel.queryUpdateEntry(id, {
        name,
        amount,
        currency,
        transaction_type,
        category,
      });
      res.json(updateMessage);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteEntry(req, res) {
    try {
      const { id } = req.params;
      const deleteMessage = await entryModel.queryDeleteEntry(id);
      res.json(deleteMessage);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new EntryController();
