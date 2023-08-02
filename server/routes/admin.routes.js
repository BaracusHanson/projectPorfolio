const express = require("express");
const { createAdmin } = require("../controllers/admin.controller");
const { checkLogin } = require("../controllers/adminlinLogin");
const router = express.Router();

router.post("/", createAdmin);
// router.post("/", checkLogin);

router.get("/", (req, res) => {
  res.json({ message: res.body });
});

router.put("/:id", (req, res) => {
  res.json({ adminId: req.params.id });
});

router.delete("/:id", (req, res) => {
  res.json({ adminId: req.params.id });
});

module.exports = router;
