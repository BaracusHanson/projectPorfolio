const express = require("express");
const routes = express.Router();
const adminControlleur = require('../controllers/admin.controller')

routes.post("/", adminControlleur.createAdmin);
routes.get("/", adminControlleur.getAllAdmins);
routes.delete("/:id", adminControlleur.deleteAdmin);
routes.put("/:id", adminControlleur.updateAdmin);

module.exports = routes;
