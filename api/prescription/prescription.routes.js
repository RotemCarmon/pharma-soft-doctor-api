const express = require("express");
const {
  getPrescriptions,
  updatePrescription,
  pharmacyReport,
} = require("./prescription.controller");

const router = express.Router();

router.post("/", getPrescriptions);
router.put("/", updatePrescription);
router.post("/report", pharmacyReport);

module.exports = router;
