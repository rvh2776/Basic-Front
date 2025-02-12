// import axios from "axios";
import { useContext, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaWhatsapp, FaMobileAlt, FaUserTag } from "react-icons/fa";
import { Loading } from "../../../components/Loading/Loading";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

// eslint-disable-next-line react/prop-types
export const CreateUser = ({ onClose, onSuccess }) => {

  const URL = import.meta.env.VITE_URL;
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    {
      name: "",
      email: "",
      imgUrl: 'images/profileImage-green.png',
      password: "",
      rePassword: "",
      whatsApp: '',
      telefono: '',
      descripcion: '',
      isAdmin: false,
    },
  );

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleIsAdmin = () => {
    setFormData((prevData) => ({ ...prevData, isAdmin: !prevData.isAdmin }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      alert('El password debe coincidir');
      return;
    }

    axios.post(`${URL}/auth/signup`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {

          console.log(response.data);

          setLoading(true);

          setTimeout(() => {
            setLoading(false);
          }, 2000);

          onClose();
          onSuccess();

        } else {
          console.log(`Error: ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error.response.data.message);
      });
  };

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-8 mx-auto max-w-md w-full">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Nuevo Usuario</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleUserChange}
                  placeholder="Nombre completo"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleUserChange}
                  placeholder="Email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleUserChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="rePassword"
                  value={formData.rePassword}
                  onChange={handleUserChange}
                  placeholder="Password nuevamente"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <FaWhatsapp className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="whatsApp"
                  value={formData.whatsApp}
                  onChange={handleUserChange}
                  placeholder="Número de WhatsApp completo"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <FaMobileAlt className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleUserChange}
                  placeholder="Número de teléfono completo"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <FaUserTag className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleUserChange}
                  placeholder="Breve descripción del rol que cumple"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between mt-4 mx-2">
                <span className="text-gray-500 font-semibold">Privilegios de Usuario</span>
                <span className="ml-2 text-sm text-blue-600 font-bold">
                  {formData.isAdmin ? "Administrador" : "Usuario"}
                </span>
                <div
                  className={`relative w-12 h-6 transition duration-200 ease-linear rounded-full ${formData.isAdmin ? "bg-blue-500" : "bg-gray-400"
                    }`}
                  onClick={toggleIsAdmin}
                >
                  <label
                    htmlFor="toggle"
                    className={`absolute left-0 inline-block w-6 h-6 transform bg-gray-200 rounded-full transition duration-100 ease-linear cursor-pointer ${formData.isAdmin ? "translate-x-6" : "translate-x-0"
                      }`}
                  ></label>
                </div>
              </div>
              <div className="items-center py-1 grid grid-cols-2 gap-4">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                >
                  Crear Cuenta
                </button>
              </div>
            </form>
          </div>
        )}
    </>
  );
};