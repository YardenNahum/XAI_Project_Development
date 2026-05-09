const express = require('express');
const router = express.Router();

/**
 * GET XAI REPORT
 * Using the Firebase REST API for public read access
 * Endpoint: /api/reports/:domain/:id
 * Example: /api/reports/Diabities_System/1
 * Response: JSON report data for the specified domain and ID
 * Error Handling: Returns appropriate status codes and error messages for fetch failures, missing data, and server errors.
 */
router.get("/:domain/:id", async (req, res) => {
  try {
    const { domain, id } = req.params;

    //DB URL
    const FIREBASE_DB_URL = "https://xai-project-b65cc-default-rtdb.firebaseio.com/"; 
    
    // Firebase REST API 
    const url = `${FIREBASE_DB_URL}/Reports/${domain}/${id}.json`;
    // Fetch the report data from Firebase
    const response = await fetch(url);
    // Handle non-OK responses from Firebase
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch from Firebase" });
    }
    // Parse the JSON response
    const data = await response.json();

    // Check if data exists (Firebase REST returns null if path is empty)
    if (!data) {
      return res.status(404).json({ error: "Report not found at this path." });
    }

    res.json(data);

  } catch (error) {
    console.error("Extraction Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;