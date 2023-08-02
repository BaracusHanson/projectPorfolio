const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const mysql = require("mysql2/promise");

// Connexion à la base de données MySQL

class UsersServices {
  async getAll() {
    try {
      // Exécuter une requête SQL pour récupérer tous les utilisateurs sans inclure le champ "password"
      const [rows] = await connection.execute(
        "SELECT admin_id, username, email, full_name, phone, role, created_at, last_login FROM admin"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UsersServices();
