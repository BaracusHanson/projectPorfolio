const validator = require("validator");

const AdminModel = {
  id: {
    type: "number",
    autoIncrement: true,
    primary: true,
  },
  name: {
    type: "string",
    required: true,
    maxLength: 25,
    validate: (value) => {
      if (!validator.isLength(value, { max: 25 })) {
        throw new Error("Le nom doit contenir au maximum 25 caractères");
      }
    },
  },
  password: {
    type: "string",
    required: true,
    maxLength: 25,
    validate: (value) => {
      if (!validator.isLength(value, { max: 25 })) {
        throw new Error(
          "Le mot de passe doit contenir au maximum 25 caractères"
        );
      }
    },
  },
  email: {
    type: "string",
    required: true,
    maxLength: 50,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Entrez un e-mail valide");
      }
    },
  },
  date: {
    timestamps: true,
  },




  
};

module.exports = AdminModel;

