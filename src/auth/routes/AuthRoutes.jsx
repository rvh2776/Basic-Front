import { Navigate, Route, Routes} from "react-router-dom";
import { SignInPage } from "../SigInPage/SignInPage";
import { SignUpPage } from "../SignUpPage/SignUpPage";

export const AuthRoutes = () => {


  return (
    <div>

      <Routes>

          {/* Ruta a la view login */}
          <Route path="login" element={<SignInPage/>} />

          {/* Ruta a la view register */}
          <Route path="register" element={<SignUpPage/>} />
          
          {/* Si solo se ingresa a la ruta: 'auth/' siempre se routea a la view: login */}
          <Route path="/*" element= { <Navigate to='/auth/login' /> } />

      </Routes>
    </div>
  )
}
