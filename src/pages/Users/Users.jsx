import { useContext, useEffect, useState } from "react";
import { DashBoardLayout } from "../../components/DashboardLayout/DashboardLayout";
import { AuthContext } from "../../context/AuthContext";
import { format } from 'date-fns';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Loading } from "../../components/Loading/Loading";
import { FaUser } from "react-icons/fa6";
import { FaCalendarCheck, FaEnvelope, FaMobileAlt, FaUserCog, FaUserTag, FaWhatsapp } from "react-icons/fa";
import { CreateUser } from "./CreateUser/CreateUser";
import { DeleteUser } from "./DeleteUser/DeleteUser";
import { EditUser } from "./EditUser/EditUser";
import { EditUserImage } from "./EditUser/EditUserImage";

export const Users = () => {

  const URL = import.meta.env.VITE_URL;

  const { token } = useContext(AuthContext);

  const [datos, setDatos] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isEditUserImageModalOpen, setIsEditUserImageModalOpen] = useState(false);


  const handleOpenCreateUserModal = () => setIsCreateUserModalOpen(true);
  const handleCloseCreateUserModal = () => setIsCreateUserModalOpen(false);

  const handleOpenEditUserModal = () => setIsEditUserModalOpen(true);
  const handleCloseEditUserModal = () => setIsEditUserModalOpen(false);

  const handleOpenEditUserImageModal = () => setIsEditUserImageModalOpen(true);
  const handleCloseEditUserImageModal = () => setIsEditUserImageModalOpen(false);

  // const [showAlertDeleteAdmin, setShowAlertDeleteAdmin] = useState(false);
  const [showAlertDeleteUser, setShowAlertDeleteUser] = useState(false);

  const decodedToken = jwtDecode(token);

  const fetchUsers = async () => {
    setLoading(true);
    setSelectedMember(null);

    try {
      const response = await axios.get(`${URL}/users/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200 || response.status === 201) {
        setDatos(response.data);
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    axios.get(`${URL}/users/`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setDatos(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URL, token]);

  const handleCardClick = (member) => {
    setSelectedMember(member);
  };

  const handleCloseDetails = () => {
    setSelectedMember(null);
  };

  const handleBorrarUser = () => {
    setShowAlertDeleteUser(true);
  };

  const filteredUsers = datos.filter((dato) => dato.name !== "Seed User");

  const usuario = datos.find((dato) => { return dato.id === decodedToken.id });

  // console.log(decodedToken)

  return (
    <DashBoardLayout>
      {
        loading
          ?
          <Loading />
          :
          decodedToken.roles === 'empleado'
            ?
            (
              <section className="bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 mx-4 sm:mx-6 lg:mx-2  pt-4 pb-8 px-4 rounded-lg sm:px-6 lg:px-8">

                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-5">
                    <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                      Usuario: {usuario?.name}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-8 ">
                    <div
                      className="mx-auto bg-gray-200 rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => handleCardClick(usuario)}
                    >
                      <img
                        className="w-60 h-60 object-cover mx-4 mt-4 rounded-lg"
                        src={usuario?.imgUrl}
                        alt={usuario?.name}
                      />
                      <div className="p-4">
                        <h3 className="flex items-center text-base font-semibold text-blue-900">
                          <FaUser className='h-5 w-5 me-3' />
                          {usuario?.name}
                        </h3>
                        <p className="flex items-center mt-1 text-sm text-gray-600">
                          <FaEnvelope className='h-5 w-5 me-3' />
                          {usuario?.email}
                        </p>
                        <p className="flex mt-1 items-center text-sm text-gray-600">
                          <FaUserCog className='h-5 w-5 me-3' />
                          {/* {(decodedToken.roles)} */}
                          {(usuario?.isAdmin) ? 'Administrador' : 'Usuario'}

                        </p>
                        <p className="flex mt-1 items-center text-sm text-gray-600">
                          <FaCalendarCheck className='h-5 w-5 me-3' />
                          {usuario?.createdAt ? format(new Date(usuario.createdAt), 'dd/MM/yyyy - HH:mm') : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedMember && (
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={handleCloseDetails}>
                    <div className="relative top-10 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
                      <div className="mt-3 text-center">
                        <img
                          className="w-80 h-80 object-cover mx-auto mt-4 rounded-lg"
                          src={selectedMember.imgUrl}
                          alt={selectedMember.name}
                        />

                        <div className="flex justify-end items-center mt-4 mx-2">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-bold">Agregar Imagen de perfil</span>
                            <button
                              type="button"
                              id="btnAddImage"
                              className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              onClick={handleOpenEditUserImageModal}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="flex items-center text-xl font-semibold text-blue-900">
                            <FaUser className='h-5 w-5 me-3' />
                            {selectedMember.name}
                          </h3>
                          <p className="flex items-center mt-1 text-sm text-gray-600">
                            <FaEnvelope className='h-5 w-5 me-3' />
                            {selectedMember.email}
                          </p>
                          <p className="flex mt-1 items-center text-sm text-gray-600">
                            <FaUserCog className='h-5 w-5 me-3' />
                            {/* {(selectedMember.roles)} */}
                            {(selectedMember.isAdmin) ? 'Administrador' : 'Usuario'}
                          </p>
                          <p className="flex mt-1 items-center text-sm text-gray-600">
                            <FaCalendarCheck className='h-5 w-5 me-3' />
                            {format(new Date(decodedToken.createdAt), 'dd/MM/yyyy - HH:mm')}
                          </p>
                        </div>

                        <div className="items-center px-2 py-1 grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            id="edit-btn"
                            className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            // onClick={handleEditarUser}
                            onClick={handleOpenEditUserModal}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            id="cancel-btn"
                            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onClick={handleCloseDetails}
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal EditUser */}
                {isEditUserModalOpen && (
                  <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleCloseEditUserModal}
                  >
                    <div
                      className=" p-4 rounded shadow-lg w-full max-w-lg relative"
                      onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro del modal
                    >
                      <button
                        className="absolute top-2 right-2 text-gray-600"
                        onClick={handleCloseEditUserModal}
                      >
                      </button>
                      <EditUser
                        onClose={handleCloseEditUserModal}
                        onSuccess={fetchUsers}
                        selectedMember={selectedMember}
                      />
                    </div>
                  </div>
                )}

                {/* Modal CreateUserImage */}
                {isEditUserImageModalOpen && (
                  <div
                    className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleCloseEditUserImageModal}
                  >
                    <div
                      className=" p-4 rounded shadow-lg w-full max-w-2xl relative"
                      onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro del modal
                    >
                      <button
                        className="absolute top-2 right-2 text-gray-600"
                        onClick={handleCloseEditUserImageModal}
                      >
                      </button>
                      <EditUserImage
                        onClose={handleCloseEditUserImageModal}
                        // datos={datos}
                        selectedMember={selectedMember}
                        onSuccess={fetchUsers} // Recarga la lista de usuarios tras creación
                      />
                    </div>
                  </div>
                )}

              </section>
            ) : (
              // <section className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 mx-4 sm:mx-6 lg:mx-2  pt-4 pb-8 px-4 rounded-lg sm:px-6 lg:px-8">
              <section className="bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 mx-4 sm:mx-6 lg:mx-2  pt-4 pb-8 px-4 rounded-lg sm:px-6 lg:px-8">

                <div className="text-end">
                  <span className="text-blue-600 font-bold me-2">Crear Usuario</span>
                  <button
                    id="btnCrear"
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={handleOpenCreateUserModal}
                  >
                    +
                  </button>
                </div>

                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-5 mt-4">
                    <h2 className="text-2xl font-extrabold text-blue-800 sm:text-3xl">
                      Usuarios registrados
                    </h2>
                    <hr className="my-3 border-gray-300" />
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredUsers.map((dato) => (

                      <div
                        key={dato.id}
                        className="bg-gray-100 rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 cursor-pointer"
                        onClick={() => handleCardClick(dato)}
                      >
                        <img
                          className="w-60 h-60 object-cover mx-auto mt-4 rounded-lg"
                          src={dato.imgUrl}
                          alt={dato.name}
                        />
                        <div className="p-4 flex flex-col items-center text-center">
                          <div className="w-60">
                            <h3 className="flex items-center justify-start text-base font-semibold text-blue-900">
                              <FaUser className='h-5 w-5 me-3' />
                              {dato.name}
                            </h3>
                            <p className="flex items-center justify-start mt-1 text-sm text-gray-600">
                              <FaEnvelope className='h-5 w-5 me-3' />
                              {dato.email}
                            </p>
                            <p className="flex items-center justify-start mt-1 text-sm text-gray-600">
                              <FaUserCog className='h-5 w-5 me-3' />
                              {(dato.isAdmin) ? 'Administrador' : 'Usuario'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
                {selectedMember && (
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={handleCloseDetails}>
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
                      <div className="mt-3 text-center">
                        <img
                          className="w-80 h-80 object-cover mx-auto mt-4 rounded-lg"
                          src={selectedMember.imgUrl}
                          alt={selectedMember.name}
                        />

                        <div className="flex justify-end items-center mt-4 mx-2">

                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-bold">Agregar Imagen de perfil</span>
                            <button
                              type="button"
                              id="btnAddImage"
                              className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              onClick={handleOpenEditUserImageModal}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="flex items-center text-xl font-semibold text-gray-900">
                            <FaUser className='h-5 w-5 me-3' />
                            {selectedMember.name}
                          </h3>
                          <p className="flex items-center text-sm mt-1 text-gray-500">
                            <FaEnvelope className='h-5 w-5 me-3' />
                            {selectedMember.email}
                          </p>
                          <p className="flex items-center text-sm mt-1 text-gray-500">
                            <FaWhatsapp className='h-5 w-5 me-3' />
                            {selectedMember.whatsApp}
                          </p>
                          <p className="flex items-center text-sm mt-1 text-gray-500">
                            <FaMobileAlt className='h-5 w-5 me-3' />
                            {selectedMember.telefono}
                          </p>
                          <p className="flex items-center text-sm mt-1 text-gray-500">
                            <FaUserTag className='h-5 w-5 me-3' />
                            {selectedMember.descripcion}
                          </p>
                          <p className="flex items-center mt-1 text-sm text-gray-500">
                            <FaUserCog className='h-5 w-5 me-3' />
                            {(selectedMember.isAdmin) ? 'Administrador' : 'Usuario'}
                          </p>
                          <div className="mt-1 mx-auto py-1">
                            <p className="flex items-center text-sm text-gray-500">
                              <FaCalendarCheck className='h-5 w-5 me-3' />
                              {format(new Date(selectedMember.createdAt), 'dd/MM/yyyy - HH:mm')}
                            </p>
                          </div>
                        </div>

                        {selectedMember.name === decodedToken.name ?
                          <div className="items-center px-4 py-1 grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              id="edit-btn"
                              className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                              onClick={handleOpenEditUserModal}
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              id="close-btn"
                              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              onClick={handleCloseDetails}
                            >
                              Cerrar
                            </button>
                          </div>
                          :
                          <div className="items-center px-4 py-1 grid grid-cols-3 gap-4">
                            <button
                              type="button"
                              id="edit-btn"
                              className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                              onClick={handleOpenEditUserModal}
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              id="delete-btn"
                              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                              onClick={handleBorrarUser}
                            >
                              Borrar
                            </button>
                            <button
                              type="button"
                              id="ok-btn"
                              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              onClick={handleCloseDetails}
                            >
                              Cerrar
                            </button>
                          </div>
                        }

                      </div>
                    </div>
                  </div>
                )}
                {/* Modal CreateUser */}
                {isCreateUserModalOpen && (
                  <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleCloseCreateUserModal}
                  >
                    <div
                      className=" p-4 rounded shadow-lg w-full max-w-lg relative"
                      onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro del modal
                    >
                      <button
                        className="absolute top-2 right-2 text-gray-600"
                        onClick={handleCloseCreateUserModal}
                      >
                      </button>
                      <CreateUser
                        onClose={handleCloseCreateUserModal}
                        onSuccess={fetchUsers} // Recarga la lista de usuarios tras creación
                      />
                    </div>
                  </div>
                )}

                {/* Modal EditUser */}
                {isEditUserModalOpen && (
                  <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleCloseEditUserModal}
                  >
                    <div
                      className=" p-4 rounded shadow-lg w-full max-w-lg relative"
                      onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro del modal
                    >
                      <button
                        className="absolute top-2 right-2 text-gray-600"
                        onClick={handleCloseEditUserModal}
                      >
                      </button>
                      <EditUser
                        onClose={handleCloseEditUserModal}
                        onSuccess={fetchUsers}
                        selectedMember={selectedMember}
                      />
                    </div>
                  </div>
                )}

                {/* Modal CreateUserImage */}
                {isEditUserImageModalOpen && (
                  <div
                    className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleCloseEditUserImageModal}
                  >
                    <div
                      className=" p-4 rounded shadow-lg w-full max-w-2xl relative"
                      onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro del modal
                    >
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-gray-600"
                        onClick={handleCloseEditUserImageModal}
                      >
                      </button>
                      <EditUserImage
                        onClose={handleCloseEditUserImageModal}
                        selectedMember={selectedMember}
                        onSuccess={fetchUsers} // Recarga la lista de usuarios tras creación
                      />
                    </div>
                  </div>
                )}

                {showAlertDeleteUser && (
                  <DeleteUser
                    onClose={() => setShowAlertDeleteUser(false)}
                    onSuccess={() => {
                      setSelectedMember(null); // Limpio el usuario seleccionado después de eliminar
                      fetchUsers(); // Actualizo la lista de usuarios
                    }}
                    selectedMember={selectedMember}
                    token={token}
                    URL={URL}
                  />
                )}

              </section>
            )
      }
    </DashBoardLayout>
  );
};