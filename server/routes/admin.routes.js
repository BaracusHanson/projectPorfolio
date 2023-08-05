const express = require("express");
const routes = express.Router();
const adminControlleur = require("../controllers/admin.controller");
const router = require("../middlewares/auth");

routes.post("/", adminControlleur.createAdmin);
routes.get("/:id", adminControlleur.getAllAdmins);
routes.delete("/:id", adminControlleur.deleteAdmin);
routes.put("/:id", adminControlleur.updateAdmin);

module.exports = routes;
