const connection = require("../config/admin.db");
const bcrypt = require("bcrypt");

module.exports.checkLogin = async (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'email existe dans la base de données
  const query = "SELECT * FROM admin WHERE email = ?";
  connection.query(query, [email], async (err, data) => {
    if (err) {
      console.error("Erreur lors de la requête SQL :", err);
      return res.status(500).json({ Error: "Erreur de base de données" });
    }

    if (data.length === 0) {
      return res.status(401).json({ Error: "Email ou mot de passe incorrect" });
    }

    const hashedPassword = data[0].password;

    // Comparer le mot de passe haché stocké dans la base de données avec le mot de passe envoyé par le formulaire
    try {
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        // Le mot de passe correspond, l'authentification est réussie
        return res.status(200).json({ Status: "Success" });
      } else {
        return res
          .status(401)
          .json({ Error: "Email ou mot de passe incorrect" });
      }
    } catch (err) {
      console.error("Erreur lors de la comparaison de hachage :", err);
      return res
        .status(500)
        .json({ Error: "Erreur lors de la vérification du mot de passe" });
    }
  });
};
