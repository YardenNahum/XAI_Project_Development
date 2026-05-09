require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

// CORS for app deployment
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://xai-study.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const reportsRoute = require("./routes/reports.route");
app.use("/api/reports", reportsRoute);

// For local testing
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Express server running locally on port ${PORT}`);
  });
}

module.exports = app;