
import { useState, useEffect } from "react";
import { NavBar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";

// eslint-disable-next-line react/prop-types
export const DashBoardLayout = ({ children }) => {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsMenuCollapsed(true);
            } else {
                setIsMenuCollapsed(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuCollapsed(!isMenuCollapsed);
    };

    return (
        <div className="min-h-screen bg-gray-300 flex">
            {/* Sidebar */}
            <Sidebar isMenuCollapsed={isMenuCollapsed} toggleMenu={toggleMenu} />

            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <NavBar toggleMenu={toggleMenu} isMenuCollapsed={isMenuCollapsed} />

                {/* Dynamic Content */}
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
};
