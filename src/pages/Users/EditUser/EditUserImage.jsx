/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useState } from "react";
import { Loading } from "../../../components/Loading/Loading";
import { AuthContext } from "../../../context/AuthContext";

export const EditUserImage = ({ onClose, onSuccess, selectedMember }) => {
    const URL = import.meta.env.VITE_URL;
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [imageError, setImageError] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Valido tipo de archivo (no deja elegir archivos que no sean de imagen)
        if (!file.type.startsWith("image/")) {
            setImageError("El archivo debe ser una imagen válida.");
            return;
        }

        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);

        setImageError("");
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setImageError("Por favor, selecciona una imagen para subir.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("imagen", image);

        setLoading(true);

        try {
            const response = await axios.post(
                `${URL}/users/${selectedMember.id}/images`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status === 200 || response.status === 201) {
                onClose();
                onSuccess();
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="bg-white rounded-lg shadow-xl p-5 mx-auto max-w-md w-full overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500">
                    <h2 className="text-3xl font-bold text-center text-gray-600 mb-4">Agregar Imagen</h2>
                    <hr className="mt-4 mb-4 border-gray-300" />
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() =>
                                        document.getElementById("file-input").click()
                                    }
                                    className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-gray-700"
                                >
                                    Agregar Imagen
                                </button>
                                <input
                                    id="file-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <span className="ml-4 text-sm text-gray-500">
                                    {image ? "1 archivo seleccionado" : "No se ha seleccionado archivo"}
                                </span>
                            </div>
                            {imageError && (
                                <p className="text-red-500 text-sm mt-2">{imageError}</p>
                            )}
                            <div className="mt-4 mx-2 grid grid-cols-1 place-items-center">
                                {preview && (
                                    <div className="relative mt-4">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            // className="w-80 h-80 object-contain rounded-md shadow-md"
                                            className="w-80 h-80 object-contain rounded-md shadow-md hover:shadow-md hover:shadow-orange-500/50"

                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            // className="absolute top-1 right-1 bg-red-500/50 text-white rounded-full px-2 py-1"
                                            className="absolute top-1 right-1 bg-red-500/50 text-white rounded-full px-2 py-1 text-xs shadow hover:bg-red-500"

                                        >
                                            X
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="items-center py-1 grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={!image}
                                className={`px-4 py-2 rounded-md ${image
                                    ? "w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                                    : "w-full bg-gray-600/30 text-white py-2 px-4 rounded-md"
                                    }`}
                            >
                                Subir Imagen
                            </button>
                        </div>

                    </form>
                </div>
            )}
        </>
    );
};