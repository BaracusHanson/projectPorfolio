const jwt = require("jsonwebtoken");

const secretKey = "votre_clé_secrète"; 

const authenticateUser = (req, res, next) => {
  // Récupére le token d'authentification depuis le header de la requête
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token d'authentification manquant." });
  }

  try {
    // Vérifie le token et récupérez les données d'utilisateur s'il est valide
    const userData = jwt.verify(token, secretKey);

    // Ajoute les données d'utilisateur vérifié à l'objet req pour les utiliser dans les routes protégées si nécessaire
    req.userData = userData;

   
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ error: "Token d'authentification invalide." });
  }
};

module.exports = authenticateUser;
