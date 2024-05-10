const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, DB_URL } = require("./config");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`Connected to database (${DB_URL})`);
  })
  .catch((err) => {
    console.error(`Error connecting to database ${err}`);
  });

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
