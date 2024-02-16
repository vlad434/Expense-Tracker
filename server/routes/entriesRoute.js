const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entryController");

//Create entry
router.post("/entries", entryController.createEntry);

// Get all entries
router.get("/entries", entryController.getAllEntries);

//Get a single entry
router.get("/entries/:id", entryController.getSingleEntry);

//Update entry
router.put("/entries/:id", entryController.updateEntry);

//Delete entry

router.delete("/entries/:id", entryController.deleteEntry);

module.exports = router;
