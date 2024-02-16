const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/db");

//middleware
app.use(cors());
app.use(express.json());

const entriesRouter = require("./routes/entriesRoute");
app.use(entriesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
