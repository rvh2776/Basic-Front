import { FiMenu, FiHome } from "react-icons/fi";
import { useState, useEffect } from "react";
import {  FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Sidebar = ({ isMenuCollapsed, toggleMenu }) => {
    const [isCollapsed, setIsCollapsed] = useState(isMenuCollapsed);
    // const [isContabilidadOpen, setIsContabilidadOpen] = useState(false); // Estado para manejar el submenú

    useEffect(() => {
        setIsCollapsed(isMenuCollapsed);
    }, [isMenuCollapsed]);

    // const toggleContabilidadMenu = () => {
    //     setIsContabilidadOpen(!isContabilidadOpen);
    // };


    // useEffect(() => {
    //     if (
    //         location.pathname === "/resumen" ||
    //         location.pathname === "/ventas" ||
    //         location.pathname === "/alquileres" ||
    //         location.pathname === "/administracion"
    //     ) {
    //         setIsContabilidadOpen(true);
    //     } else {
    //         setIsContabilidadOpen(false);
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location.pathname]);
    
    return (
        <aside
            className={`bg-gradient-to-l from-gray-600 to-blue-700 text-white transition-all duration-300 ease-in-out ${isCollapsed ? "w-0 md:w-20" : "w-52"}`}>
            <div className="p-4">
                <img src="/images/logo.png" className="w-48 mb-4 mx-auto bg-gradient-to-l from-blue-700 to-gray-800 rounded-full " />

                <button
                    onClick={toggleMenu}
                    className="text-white focus:outline-none"
                >
                    <FiMenu className="h-6 w-6" />
                </button>
            </div>
            <nav className="mt-2">
                <Link
                    to='/dashboard'
                    className={
                        `flex 
                         items-center 
                         py-2 px-4 
                         text-gray-300 
                         hover:bg-gray-700 
                         ${location.pathname === '/dashboard' ? 'bg-gray-600' : ''} 
                         ${isCollapsed ? 'bg-transparent' : ''}`
                    }
                >
                    <FiHome className='h-5 w-5' />
                    {!isCollapsed && <span className="ml-2">Inicio</span>}
                </Link>

                {/* <div className="py-2 px-4 text-gray-300 hover:bg-gray-600 cursor-pointer" onClick={toggleContabilidadMenu}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FaHome className="h-5 w-5" />
                            {!isCollapsed && <span className="ml-2">Propiedades</span>}
                        </div>
                        {!isCollapsed && (
                            <span>
                                {isContabilidadOpen ? <FaChevronUp className="h-4 w-4" /> : <FaChevronDown className="h-4 w-4" />}
                            </span>
                        )}
                    </div>
                </div>
                {isContabilidadOpen && !isCollapsed && (
                    <div className="">
                        <Link to="/resumen" className={`block py-1 ps-12 text-gray-300 hover:bg-orange-600 ${location.pathname === '/resumen' ? 'bg-orange-600' : ''}`}>Resumen</Link>
                        <Link to="/ventas" className={`block py-1 ps-12 text-gray-300 hover:bg-orange-600 ${location.pathname === '/ventas' ? 'bg-orange-600' : ''}`}>Ventas</Link>
                        <Link to="/alquileres" className={`block py-1 ps-12 text-gray-300 hover:bg-orange-600 ${location.pathname === '/alquileres' ? 'bg-orange-600' : ''}`}>Alquileres</Link>
                        <Link to="/administracion" className={`block py-1 ps-12 text-gray-300 hover:bg-orange-600 ${location.pathname === '/administracion' ? 'bg-orange-600' : ''}`}>Administración</Link>
                    </div>
                )} */}

                <Link
                    to='/users'
                    className={
                        `flex 
                         items-center 
                         py-2 px-4 
                         text-gray-300 
                         hover:bg-gray-700 
                         ${location.pathname === '/users' ? 'bg-gray-600' : ''} 
                         ${isCollapsed ? 'bg-transparent' : ''}`
                    }
                >
                    <FaUsers className='h-5 w-5' />
                    {!isCollapsed && <span className="ml-2">Usuarios</span>}
                </Link>
            </nav>
        </aside>
    );
};
