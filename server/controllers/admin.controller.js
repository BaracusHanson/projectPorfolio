// admin.controller.js
const dbConnection = require("../config/admin.db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const salt = process.env.SALT;

// Opération CREATE (Ajouter un nouvel administrateur)
const createAdmin = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, Number(salt), (err, hashPassword) => {
    if (err) {
      return res.json({ error: "erreur lors du hachage du mot de passe" });
    }

    const insertQuery =
      "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)";
    dbConnection.query(
      insertQuery,
      [name, email, hashPassword],
      (err, result) => {
        if (err) {
          res
            .status(400)
            .json({ error: "Erreur lors de la création de l'administrateur." });
        } else {
          res
            .status(201)
            .json({ id: result.insertId, name, email, hashPassword });
        }
      }
    );
  });
};

// Opération READ (Récupérer tous les administrateurs)
const getAllAdmins = (req, res) => {
  const selectQuery = "SELECT * FROM admin";
  dbConnection.query(selectQuery, (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des administrateurs." });
    } else {
      res.status(200).json(results);
    }
  });
};

// Opération UPDATE (Mettre à jour un administrateur existant)
const updateAdmin = (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const updateQuery = "UPDATE admin SET name=?, email=?, password=? WHERE id=?";
  dbConnection.query(
    updateQuery,
    [name, email, password, id],
    (err, result) => {
      if (err) {
        res.status(400).json({
          error: "Erreur lors de la mise à jour de l'administrateur.",
        });
      } else {
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Administrateur non trouvé." });
        }
        res.json({ id, name, email, password });
      }
    }
  );
};

// Opération DELETE (Supprimer un administrateur)
const deleteAdmin = (req, res) => {
  const { id } = req.params;
  const deleteQuery = "DELETE FROM admin WHERE id=?";
  dbConnection.query(deleteQuery, [id], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression de l'administrateur." });
    } else {
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Administrateur non trouvé." });
      }
      res.json({ message: "Administrateur supprimé avec succès." });
    }
  });
};

const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  const selectQuery = "SELECT * FROM admin WHERE email = ?";

  // Chercher l'administrateur par son email dans la base de données
  dbConnection.query(selectQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la connexion." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Administrateur non trouvé." });
    }

    const admin = results[0];

    // Comparer le mot de passe fourni avec le mot de passe haché dans la base de données
    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: "Identifiants invalides." });
      }

      // Générer un token avec l'ID de l'administrateur et une durée d'expiration de 1 heure
      const token = jwt.sign({ id: admin.id }, "votre_clé_secrète", {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    });
  });
};

// admin.controller.js

// Fonction pour récupérer un administrateur par ID.
const getAdminById = (req, res) => {
  const adminId = req.params.id;
  const selectQuery = "SELECT * FROM admin WHERE id = ?";

  dbConnection.query(selectQuery, [adminId], (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de l'administrateur." });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "Administrateur non trouvé." });
      } else {
        const admin = results[0];
        // Supprimez le champ "password" avant d'envoyer les informations de l'administrateur
        delete admin.password;
        res.status(200).json(admin);
        console.log(admin);
      }
    }
  });
};

module.exports = {
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  getAdminById,
};
