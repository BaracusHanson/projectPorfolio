const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "votre_clé_secrète"; // Assurez-vous d'utiliser la même clé secrète que celle utilisée lors de la génération du token.

// Importez la fonction getAllAdmins du contrôleur (nous l'avons déjà définie précédemment).
const { getAllAdmins } = require("../controllers/admin.controller");

// Middleware pour vérifier le token JWT et récupérer les informations de l'utilisateur connecté.
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Accès non autorisé." });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: "Token invalide." });
    req.user = user;
    next();
  });
};

// Route pour récupérer les informations de l'utilisateur connecté.
router.get("/me", authenticateToken, (req, res) => {
  const userId = req.user.id; // L'ID de l'utilisateur connecté est stocké dans req.user après vérification du token.

  // Ici, vous pouvez utiliser l'ID de l'utilisateur pour récupérer ses informations depuis la base de données.
  // Exemple avec la fonction getAllAdmins :
  const user = getAllAdmins().find((admin) => admin.id === userId);
  if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

  // Supprimez le mot de passe de la réponse avant de l'envoyer.
  delete user.password;

  res.status(200).json(user);
});

module.exports = router;
