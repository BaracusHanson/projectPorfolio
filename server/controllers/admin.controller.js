const connection = require("../config/admin.db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

module.exports.createAdmin = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res
      .status(400)
      .json({ message: "Une erreur s'est produite lors de la connexion" });
  }

  try {
    // Hacher le mot de passe avec bcrypt
    const passHash = await bcrypt.hash(data.password, Number(process.env.SALT));

    // Établir la connexion à la base de données
    await connection.connect();

    // Requête SQL pour insérer les données de l'administrateur
    const query =
      "INSERT INTO admin (name, password, email, date) VALUES (?, ?, ?, ?)";
    const values = [data.name, passHash, data.email, new Date()];

    // Exécuter la requête INSERT
    connection.query(query, values, (err, result) => {
      // Fermer la connexion après l'opération
      //   connection.end();

      if (err) {
        console.error("Erreur lors de la création de l'administrateur : ", err);
        return res.status(500).json({
          message:
            "Une erreur s'est produite lors de la création de l'administrateur",
        });
      }

      return res.status(200).json({ message: "Ajout d'un admin avec succès" });
    });
  } catch (err) {
    console.error("Erreur lors de la connexion à la base de données : ", err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la connexion à la base de données",
    });
  }
};
