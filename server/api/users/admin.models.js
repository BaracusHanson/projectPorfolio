// const connection = require("../../config/index");
// const dotenv = require("dotenv");

// dotenv.config();

// class Admin {
//   constructor(admin) {
//     (this.name = admin.name),
//       (this.password = admin.password),
//       (this.email = admin.email),
//       (this.date = admin.date);
//   }

//   static create(newAdmin) {
//     return new Promise((resolve, reject) => {
//       connection.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve.json({ message: "insertion d'admin" });
//         }
//       });
//     });
//   }
// }

// module.exports = Admin;
