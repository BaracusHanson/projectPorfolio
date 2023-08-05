import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:3000/register", formData)
      .then((res) => {
        console.log(res.data); // Affiche la réponse JSON en cas de succès
      })
      .catch((err) => {
        console.log(err.response.data); // Affiche la réponse JSON en cas d'erreur
      });
  };
  axios.defaults.withCredentials = true;
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="w-[400px] h-[500px] mx-auto p-4 bg-gray-100 rounded-lg shadow-md ">
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Ajouter un nouvel utilisateur
        </h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-semibold">
            name :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
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
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-semibold">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className=" w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 mb-4"
        >
          Soumettre
        </button>
        <Link
          to="/login"
          className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-500 flex justify-center items-center"
        >
          S'identifier
        </Link>
      </form>
    </div>
  );
};

export default MyForm;
