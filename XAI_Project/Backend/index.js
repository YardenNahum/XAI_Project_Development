require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin'); 
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

if (!admin.apps.length) {
  try {
    // Parse the JSON string from your .env
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.DB_URL
    });
    console.log('Connected to Firebase Firestore!');
  } catch (err) {
    console.error('Firebase initialization error:', err);
  }
}

// cors for app deployment
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://xai-study.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const reportsRoute = require("./routes/reports.route");
app.use("/api/reports", reportsRoute);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Express server running locally on port ${PORT}`);
  });
}

module.exports = app;