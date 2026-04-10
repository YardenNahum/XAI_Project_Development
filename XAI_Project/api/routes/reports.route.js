const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

/**
 * GET XAI REPORT
 * Path in Firebase: /Reports/{domain}/{id}
 */
router.get("/:domain/:id", async (req, res) => {
  try {
    const { domain, id } = req.params;
    
    // Get a reference to the Database
    const db = admin.database();
    
    // Point to the specific ID 
    const ref = db.ref(`Reports/${domain}/${id}`);

    // Take a snapshot of that location
    const snapshot = await ref.once('value');

    // Check if there is actually data there
    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Report not found at this path." });
    }

    // get the data from the snapshot and send it back as JSON
    res.json(snapshot.val());

  } catch (error) {
    console.error("Extraction Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;