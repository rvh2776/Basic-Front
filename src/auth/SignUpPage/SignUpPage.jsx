// import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaIdCard} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";

export const SignUpPage = () => {

  // const URL = import.meta.env.VITE_URL;

  // const navigate = useNavigate();

  // const [loading, setLoading] = useState(false);
  const loading = true;

  const [formData, setFormData] = useState(
    {
      name: "",
      email: "",
      tipoDocum: "",
      documento: "",
      codArea: "",
      telefono: '',
      imgUrl: 'https://exmple-image.webp',
      password: "",
      rePassword: "",  
    },
  );

  const backgroundImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  }, 60000);


    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      alert('El password debe coincidir');
      return;
    }

    console.log(formData);
    // axios.post(`${URL}/auth/signupCli`, formData)
    //   .then((response) => {
    //     if (response.status === 200 || response.status === 201) {

    //       console.log(response.data);

    //       setLoading(true);

    //       setTimeout(() => {
    //         setLoading(false);
    //         navigate('/auth/login');
    //       }, 2000);

    //     } else {
    //       console.log(`Error: ${response.statusText}`);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data);
    //     alert(error.response.data.message);
    //   });

    // console.log("Form submitted:", formData);
  };

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
          // <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
          <div className="min-h-screen bg-cover flex items-center justify-center p-4"
            style={{
              backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
              backgroundBlend: "overlay"
            }}>
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
              <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Registrarse</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <FaUser className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleUserChange}
                    placeholder="Nombre completo"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-1/3 top-3 left-3 text-gray-400">
                    <select
                      name="tipoDocum"
                      value={formData.tipoDocum}
                      onChange={handleUserChange}
                      className="w-full pl-1 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      style={{
                        color: formData.tipoDocum ? "black" : "text-gray-400", // Cambio a negro si hay una opción seleccionada
                      }}
                      required
                    >
                      <option value="">Seleccionar</option>
                      <option value="DNI">DNI</option>
                      <option value="CI">CI</option>
                      <option value="CUIT">CUIT</option>
                      <option value="CUIL">CUIL</option>
                      <option value="Pasaporte">PASAPORTE</option>
                    </select>
                  </div>
                  <div className="w-2/3 relative">
                    <FaIdCard className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="text"
                      name="documento"
                      value={formData.documento}
                      onChange={handleUserChange}
                      placeholder="Documento"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-1/3 top-3 left-3 text-gray-400">
                    <input
                      type="text"
                      name="codArea"
                      value={formData.codArea}
                      onChange={handleUserChange}
                      placeholder="54 9261"
                      className="w-full pl-2 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="w-2/3 relative">
                    <FaPhoneAlt className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="text"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleUserChange}
                      placeholder="5101206"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleUserChange}
                    placeholder="Email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                  >
                    Crear Cuenta
                  </button>
                </div>
              </form>

              <div className="flex items-center space-x-4 mt-5">
                <div className="w-1/4 top-3 left-3 text-gray-400">
                  <p className="mt-4 text-start text-sm text-gray-600 font-bold">
                    <Link className="font-medium text-green-600 hover:text-green-500" to="/">
                      Inicio
                    </Link>
                  </p>
                </div>
                <div className="w-3/4 relative">
                  <p className="mt-4 text-end text-sm text-gray-600 font-bold">
                    Ya tienes cuenta?{" - "}
                    <Link className="font-medium text-green-600 hover:text-green-500" to="/auth/login">
                      Iniciar sesión
                    </Link>
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}
    </>
  );
};