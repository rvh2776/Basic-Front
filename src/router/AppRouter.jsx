import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import LandingPage from "../pages/LandingPage/LandingPage";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Users } from "../pages/Users/Users";
import SnakeGame from "../pages/SnakeGame/SnakeGame";

export const AppRouter = () => {

    const { isLogin } = useContext(AuthContext);

    useEffect(() => {
        // Aquí puedo realizar acciones adicionales si el estado de autenticación cambia.
        console.log("Autenticado:", isLogin);
    }, [isLogin]);

  return (
    <>
        {
            isLogin
            ? (
            <Routes>
                {/* Vistas logueado */}
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/users" element={<Users/>}/>

                <Route path="/*" element= { <Navigate to='/dashboard' /> } />
            </Routes>
            ) : (
            <Routes>
                {/* Login y registro */}
                <Route path="/auth/*" element={<AuthRoutes/>} />
                <Route path="/" element={<LandingPage/>} />
                <Route path="/snake" element={<SnakeGame />} />

                <Route path="/*" element= { <Navigate to='/' /> } />
            </Routes>
            )
        }
    </>
  )
}
