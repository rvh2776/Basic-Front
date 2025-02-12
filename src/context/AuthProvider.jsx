import { useEffect, useState, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const URL = import.meta.env.VITE_URL;

  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const inactivityTimeoutRef = useRef(null);
  const sessionWarningTimeoutRef = useRef(null);
  const renewalTimeoutRef = useRef(null);

  const events = ["mousemove", "keydown", "click", "scroll"];

  const INACTIVITY_TIME_LIMIT = 15 * 60 * 1000; // 15 minutos
  const WARNING_BEFORE_LOGOUT = 1 * 60 * 1000; // 1 minuto

  // Mostrar alerta antes de cerrar sesión
  const showSessionWarning = () => {
    Swal.fire({
      title: "Tu sesión está a punto de expirar",
      html: '<p class="text-gray-600 font-bold">¿Quieres continuar?</p>',
      showCancelButton: true,
      confirmButtonText: "Continuar sesión",
      cancelButtonText: "Cerrar sesión",
      customClass: {
        popup: "bg-white rounded-lg shadow-lg pb-6",
        title: "text-green-600",
        text: "text-red-600",
        cancelButton: "w-auto bg-red-600 text-white py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 transition duration-200",
        confirmButton: "w-auto bg-green-600 text-white py-1 rounded-md hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-2 transition duration-200",
        actions: "flex justify-center space-x-4",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        resetInactivityTimeout(); // Reinicia el contador
        checkAndRenewToken(); // Renueva el token si es necesario
      } else {
        logoutUser(); // Cierra la sesión si cancela
      }
    });
  };

  // Verifica y renueva el token
  const checkAndRenewToken = async () => {
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      const tokenDuration = (decodedToken.exp - decodedToken.iat) * 1000;
      const timeSinceIssued = Date.now() - decodedToken.iat * 1000;
      const timeLeft = tokenDuration - timeSinceIssued;

      if (timeLeft < 5 * 60 * 1000) {
        const response = await axios.post(`${URL}/auth/refresh-token`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const newToken = response.data.token;

        if (newToken) {
          localStorage.setItem("token", JSON.stringify(newToken));
          setToken(newToken);
        } else {
          logoutUser();
        }
      }
    } catch (error) {
      logoutUser();
    }
  };

  // Programar renovación del token
  const scheduleTokenRenewal = () => {
    if (!token) return;

    clearTimeout(renewalTimeoutRef.current);

    const decodedToken = jwtDecode(token);
    const tokenDuration = (decodedToken.exp - decodedToken.iat) * 1000;
    const timeSinceIssued = Date.now() - decodedToken.iat * 1000;
    const timeLeft = tokenDuration - timeSinceIssued;

    const renewalTime = timeLeft - 5 * 60 * 1000; // 5 minutos antes de expirar
    if (renewalTime > 0) {
      renewalTimeoutRef.current = setTimeout(checkAndRenewToken, renewalTime);
    } else {
      checkAndRenewToken(); // Renovar inmediatamente si ya está cerca de expirar
    }
  };

  // Reinicia el temporizador de inactividad
  const resetInactivityTimeout = () => {
    clearTimeout(inactivityTimeoutRef.current);
    clearTimeout(sessionWarningTimeoutRef.current);

    if (isLogin) {
      inactivityTimeoutRef.current = setTimeout(() => {
        showSessionWarning();

        sessionWarningTimeoutRef.current = setTimeout(logoutUser, WARNING_BEFORE_LOGOUT);
      }, INACTIVITY_TIME_LIMIT - WARNING_BEFORE_LOGOUT);
    }
  };

  const handleActivity = () => {
    resetInactivityTimeout();
  };

  useEffect(() => {
    if (isLogin) {
      events.forEach((event) => window.addEventListener(event, handleActivity));
      scheduleTokenRenewal(); // Programar renovación del token
    }

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      clearTimeout(inactivityTimeoutRef.current);
      clearTimeout(sessionWarningTimeoutRef.current);
      clearTimeout(renewalTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, token]);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLogin") === "true";
    const storedToken = JSON.parse(localStorage.getItem("token"));

    setIsLogin(storedLogin);
    setToken(storedToken);

    if (storedLogin) {
      resetInactivityTimeout();
      scheduleTokenRenewal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUser = (token) => {
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("token", JSON.stringify(token));
    setIsLogin(true);
    setToken(token);
    resetInactivityTimeout();
    scheduleTokenRenewal();
  };

  const logoutUser = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("token");
    setIsLogin(false);
    setToken(null);
    clearTimeout(inactivityTimeoutRef.current);
    clearTimeout(sessionWarningTimeoutRef.current);
    clearTimeout(renewalTimeoutRef.current);
    Swal.close();
  };

  return (
    <AuthContext.Provider value={{ isLogin, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

