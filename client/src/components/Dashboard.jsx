import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]); // On initialise le state "data" à null
  const navigate = useNavigate();
  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié en vérifiant la présence du token dans les cookies
    const token = localStorage.getItem("token");
    if (token) {
      // L'utilisateur est authentifié, récupérer ses informations depuis le backend
      axios
        .get("http://localhost:3000/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            // Authentification réussie
            setAuth(true);
            console.log(res.data);
            setData(res.data); // Stocker toutes les informations de l'administrateur dans "data"
          } else {
            // Authentification échouée, afficher le message d'erreur
            setAuth(false);
            setMessage("Erreur lors de l'authentification");
          }
        })
        .catch((err) => {
          console.error(err);
          setMessage("Erreur survenue essayez de vous reconnecter");
        });
    } else {
      // L'utilisateur n'est pas authentifié
      setAuth(false);
      setMessage("Connectez-vous pour accéder au tableau de bord");
    }
  }, []);

  const handleLogout = () => {
    // Déconnexion : supprimer le token des cookies et réinitialiser l'état
    localStorage.removeItem("token");
    setAuth(false);
    setMessage("Déconnecté avec succès");
    navigate("/login");
  };

  return (
    <>
      <div className="w-full flex justify-end items-center">
        {auth ? (
          <div className="flex justify-between items-center p-4 bg-cyan-400 w-full">
            <h1 className="text-3xl">
              Bienvenue{" "}
              <span className="font-semibold uppercase text-white">
                {data && data.name}{" "}
                {/* Accéder au nom de l'administrateur s'il existe */}
              </span>
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center p-4 bg-cyan-400 w-full">
            <h1 className="text-2xl"> {message} </h1>
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Connexion
            </Link>
          </div>
        )}
      </div>
      <div className="w-full flex justify-between items-center h-full">
        <table className="table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 py-2">ID</th>
              <th className="border border-gray-500 px-4 py-2">Nom</th>
              <th className="border border-gray-500 px-4 py-2">Email</th>
              <th className="border border-gray-500 px-4 py-2">password</th>
            </tr>
          </thead>
          <tbody>
            {data.map((admin) => (
              <tr key={admin.id}>
                <td className="border border-gray-500 px-4 py-2">{admin.id}</td>
                <td className="border border-gray-500 px-4 py-2">
                  {admin.name}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {admin.email}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {admin.password}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
