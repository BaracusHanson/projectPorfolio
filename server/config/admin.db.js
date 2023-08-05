const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Établir la connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données : ", err);
    return;
  }
  console.log("Connexion à la base de données réussie !");

  // // Exécuter une requête SELECT
  // connection.query("SELECT * FROM ma_table", (err, rows) => {
  //   if (err) {
  //     console.error("Erreur lors de l'exécution de la requête : ", err);
  //     return;
  //   }
  //   console.log("Résultat de la requête : ", rows);
  // });

  // Fermer la connexion après avoir terminé les opérations
  // connection.end((err) => {
  //   if (err) {
  //     console.error("Erreur lors de la fermeture de la connexion : ", err);
  //     return;
  //   }
  //   console.log("Connexion à la base de données fermée !");
  // });
});

module.exports = connection;
