/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2'

export const DeleteUser = ({ onClose, onSuccess, selectedMember, token, URL }) => {

    const { name, id } = selectedMember;

    useEffect(() => {
        Swal.fire({
            title: `Borrar a: ${name}?`,
            html: '<p class="text-gray-600 font-bold">Esta acción no se puede revertir!</p>',
            showCancelButton: true,
            confirmButtonText: "Borrar",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: 'bg-white rounded-lg shadow-lg pb-6',
                title: 'text-blue-600',
                text: 'text-red-600',
                confirmButton: 'w-auto bg-red-600 text-white py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 transition duration-200',
                cancelButton: 'w-auto bg-gray-600 text-white py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 transition duration-200',
                actions: 'flex justify-center space-x-4',
            }
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`${URL}/users/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then((response) => {
                            if (response.status === 200 || response.status === 201) {
                                Swal.fire({
                                    title: "Borrado!",
                                    html: `<p class="text-gray-600 font-bold">El usuario ${name} se borró con éxito.</p>`,
                                    confirmButtonText: "Aceptar",
                                    customClass: {
                                        popup: 'bg-white rounded-lg shadow-lg pb-6',
                                        title: 'text-blue-600',
                                        confirmButton: 'w-auto bg-gray-600 text-white py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 transition duration-200',
                                    },
                                })
                                onSuccess(); // Notifica que se borró exitosamente
                            }
                        })
                        .catch((error) => {
                            const errorMessage = error.response?.data?.message || 'Hubo un problema al intentar borrar el usuario.';
                            const errorCode = error.response?.status;
                        
                            if (errorCode === 409) { // Código de conflicto
                                Swal.fire({
                                    title: "No se puede eliminar",
                                    html: `<p class="text-gray-500">${errorMessage}</p>`,
                                    confirmButtonText: "Aceptar",
                                    customClass: {
                                        popup: 'bg-white rounded-lg shadow-lg pb-6',
                                        title: 'text-red-600',
                                        confirmButton: 'w-auto bg-red-600 text-white py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 transition duration-200',
                                    },
                                });
                            } else {
                                Swal.fire({
                                    title: "Error",
                                    html: `<p class="text-gray-600 font-bold">${errorMessage}</p>`,
                                    confirmButtonText: "Aceptar",
                                    customClass: {
                                        popup: 'bg-white rounded-lg shadow-lg pb-6',
                                        title: 'text-red-600',
                                        confirmButton: 'w-auto bg-red-600 text-white py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 transition duration-200',
                                    },
                                });
                            }
                        })
                        .finally(() => {
                            onClose(); // Cierra el modal de confirmación
                        });
                } else {
                    onClose(); // Cierra el modal si se cancela
                }
            });
    }, [onClose, onSuccess, id, name, token, URL]);

    return null;
}