/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import Swal from 'sweetalert2'

export const AlertSignIn = ({ msgAlert }) => {

    const message = msgAlert.message;
    let error = '';

    if (msgAlert && msgAlert.error === 'Unauthorized' ) {
        error = 'No autorizado';
    }

    useEffect(() => {
        Swal.fire({
            title: `${error}`,
            text: `${message}`,
            // icon: 'error',
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'bg-white rounded-lg shadow-lg pb-6',
                title: 'text-green-600',
                confirmButton: 'w-full bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200',
            }
        });

    }, [error, message])
    
    return null;
}
