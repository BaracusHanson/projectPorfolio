import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  //   axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3000/dashboard", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === 200) {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/logout")
      .then((res) => {
        location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full flex justify-end items-center">
      {auth ? (
        <div className="flex justify-between items-center p-4 bg-cyan-400 w-full">
          <h1 className="text-3xl">
            Bienvenue <span className="font-semibold uppercase">{name}</span>
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Déconnection
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center p-4 bg-cyan-400 w-full">
          <h1 className="text-3xl"> {message} </h1>
          {/* <h1 className="text-3xl">Connectez-vous {} </h1> */}
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Connection
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
