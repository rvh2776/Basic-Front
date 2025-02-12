/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { FaUser, FaEnvelope, FaWhatsapp, FaMobileAlt, FaUserTag } from "react-icons/fa";
import { Loading } from "../../../components/Loading/Loading";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export const EditUser = ({ onClose, onSuccess, selectedMember }) => {

    const URL = import.meta.env.VITE_URL;
    const { token } = useContext(AuthContext);

    const decodedToken = jwtDecode(token);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(
        {
            id: selectedMember.id,
            name: selectedMember.name,
            email: selectedMember.email,
            imgUrl: selectedMember.imgUrl,
            whatsApp: selectedMember.whatsApp,
            telefono: selectedMember.telefono,
            descripcion: selectedMember.descripcion,
            isAdmin: selectedMember.isAdmin,
        },
    );

    let userLogin = false;

    if (decodedToken.id === selectedMember.id) {
        userLogin = true;
    }

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleIsAdmin = () => {
        setFormData((prevData) => ({ ...prevData, isAdmin: !prevData.isAdmin }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = userLogin ? `${URL}/users/me/${selectedMember.id}` : `${URL}/users/${selectedMember.id}`;

        axios.put(endpoint, formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    onSuccess();
                } else {
                    console.log(`Error: ${response.statusText}`);
                }
            })
            .catch((error) => {
                console.log(error.response.data);
                alert(error.response.data.message);
            })
            .finally(() => {
                setLoading(false);
                onClose();
            });
    };

    return (
        <>
            {
                userLogin ?

                    loading ? (
                        <Loading />
                    ) : (

                        <div className="bg-white rounded-lg shadow-xl p-8 mx-auto max-w-md w-full">
                            <h2 className="text-3xl font-bold text-center text-gray-600 mb-8">Editar a: {selectedMember.name}</h2>

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
                                    <FaWhatsapp className="absolute top-3 left-3 text-gray-400" />
                                    <input
                                        type="whatsApp"
                                        name="whatsApp"
                                        value={formData.whatsApp}
                                        onChange={handleUserChange}
                                        placeholder="WhatsApp"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <FaMobileAlt className="absolute top-3 left-3 text-gray-400" />
                                    <input
                                        type="telefono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleUserChange}
                                        placeholder="Telefono"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <FaUserTag className="absolute top-3 left-3 text-gray-400" />
                                    <input
                                        type="descripcion"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleUserChange}
                                        placeholder="Descripcion"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="items-center py-1 grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        id="cancel-btn"
                                        className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        onClick={onClose}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </form>
                        </div>
                    )
                    :
                    (
                        loading ?
                            (
                                <Loading />
                            ) : (

                                <div className="bg-white rounded-lg shadow-xl p-8 mx-auto max-w-md w-full">
                                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Editar a: {selectedMember.name}</h2>

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
                                            <FaWhatsapp className="absolute top-3 left-3 text-gray-400" />
                                            <input
                                                type="whatsApp"
                                                name="whatsApp"
                                                value={formData.whatsApp}
                                                onChange={handleUserChange}
                                                placeholder="WhatsApp"
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="relative">
                                            <FaMobileAlt className="absolute top-3 left-3 text-gray-400" />
                                            <input
                                                type="telefono"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleUserChange}
                                                placeholder="Telefono"
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="relative">
                                            <FaUserTag className="absolute top-3 left-3 text-gray-400" />
                                            <input
                                                type="descripcion"
                                                name="descripcion"
                                                value={formData.descripcion}
                                                onChange={handleUserChange}
                                                placeholder="Descripcion"
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
                                                className={`relative w-12 h-6 transition duration-200 ease-linear rounded-full ${formData.isAdmin ? "bg-blue-500" : "bg-blue-400"
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
                                                type="button"
                                                id="cancel-btn"
                                                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                onClick={onClose}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                                            >
                                                Confirmar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )
                    )}
        </>
    );
};