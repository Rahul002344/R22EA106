const express = require("express");
const { calculateAverage } = require("../controllers/averageController");

const router = express.Router();

router.post("/average", calculateAverage);

module.exports = router;
