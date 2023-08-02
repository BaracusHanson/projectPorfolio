import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    motDePasse: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/login", formData).then((res) => {
      if (res.data.Status === "Success") {
        navigate("/dashboard");
      } else {
        alert(res.data.Error);
      }
    });
    // .catch((err) => {
    //   console.log(err.response.data); // Affiche la réponse JSON en cas d'erreur
    // });
    // console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center">Connexion</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-semibold">
              Mot de passe :
            </label>
            <input
              type="motDePasse"
              id="motDePasse"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Mot de passe"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 mb-2"
          >
            Se connecter
          </button>

          <Link
            to="/register"
            className="w-full px-4 py-2 text-white bg-green-400 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-500 flex justify-center items-center"
          >
            Créer un compte
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
