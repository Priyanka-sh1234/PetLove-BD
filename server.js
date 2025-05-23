// server.js
const express = require("express");

require('dotenv').config();

const mongoose = require("mongoose");
const chalk = require("chalk");
const routes = require("./routes");
const cors = require("cors");
const path = require('path');




const backend = express();



backend.use(express.json());



backend.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));




backend.use('/UPLOAD/reports', express.static(path.join(__dirname, 'UPLOAD/reports')));

// Routes
backend.use(routes); 





// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`);
    const PORT = process.env.PORT || 4000;
    backend.listen(PORT, () => {
      console.log(`${chalk.green("✓")} ${chalk.blue("Server Started on port")} ${chalk.bgMagenta.white(PORT)}`);
    });
  })
  .catch((err) => console.log(err));

