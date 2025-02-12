import axios from "axios";
import { useContext, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AlertSignIn } from "../Alerts/AlertSignIn";

export const SignInPage = () => {

  const URL = import.meta.env.VITE_URL;

  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [alerts, setAlerts] = useState(false);
  const [msgAlert, setMsgAlert] = useState({ error: '', message: '' });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("Form submitted:", formData);
    axios.post(`${URL}/auth/signin`, formData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          loginUser(response.data.token);
          navigate('/dashboard');

        } else {
          console.log(`Error: ${response.statusText}`);
        }
      })
      .catch((error) => {
        setMsgAlert(error.response.data);
        setAlerts(true);
      })
      .finally(() => {
        setTimeout(() => {
          setAlerts(false); // Resetea `alerts` al final de la solicitud
        }, 1000);
      });
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-800 to-gray-900 text-white py-8 overflow-hidden">
      
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/skulls.png')",
          backgroundRepeat: "repeat",
        }}
      ></div>
      
      {/* <div className="bg-gray-700 rounded-lg shadow-xl p-8 max-w-md w-full z-10"> */}
      <div className="bg-gradient-to-b from-gray-700 to-blue-900 rounded-lg shadow-xl p-8 max-w-md w-full z-10">
        <h2 className="text-3xl font-bold text-center text-gray-50 mb-8">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-gray-100 text-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Iniciar Sesion
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-4 mt-5">
          <div className="w-1/4 top-3 left-3 text-gray-400">
            <p className="mt-4 text-start text-sm text-gray-600 font-bold">
              <Link className="ms-1 font-medium text-gray-50 hover:text-organge-400 hover:font-semibold" to="/">
                Inicio
              </Link>
            </p>
          </div>
        </div>
      </div>
      {alerts && <AlertSignIn msgAlert={msgAlert} />}
    </div>
  );
};