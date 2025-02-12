// src/components/NavBar/NavBar.jsx
import { useState, useRef, useContext, useEffect } from "react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const NavBar = ({ toggleMenu, isMenuCollapsed }) => {
    const [user, setUser] = useState({
        name: "John Doe",
        image: "images/profileImage-blue.png"
    });

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);

    const { token, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        const decoded = jwtDecode(token); // Decodifico el token solo cuando cambia.
        setUser({ ...user, name: decoded.name, image: decoded.imgUrl });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target)
            ) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-gray-600 to-blue-700 shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-2 flex justify-between items-center">
                <div className="flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="mr-4 md:hidden text-gray-600 focus:outline-none"
                    >
                        {isMenuCollapsed ? <FiMenu className="h-6 w-6" />
                            : ''
                        }
                    </button>
                    <h1 className="text-1xl sm:text-2xl md:text-3xl pl-1 text-sm-sm font-semibold text-gray-50">Su Marca</h1>
                </div>
                <div className="relative" ref={profileMenuRef}>
                    <button
                        onClick={toggleProfileMenu}
                        className="flex items-center space-x-3 focus:outline-none"
                    >
                        <span className="text-gray-50 text-1xl mr-2">
                            {user.name}
                        </span>
                        <img
                            src={user.image}
                            alt="Profile"
                            className="h-8 w-8 rounded-full object-cover"
                        />
                        <FiChevronDown className="h-4 w-4 text-gray-50" />
                    </button>
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <Link
                                to="/users"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                                Perfil
                            </Link>
                            <Link
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                onClick={logoutUser}
                            >
                                Salir
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

