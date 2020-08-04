const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ router: "orders" });
});

module.exports = router;
