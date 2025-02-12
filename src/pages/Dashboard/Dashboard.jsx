// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { DashBoardLayout } from "../../components/DashboardLayout/DashboardLayout";

export const Dashboard = () => {

    // const URL = import.meta.env.VITE_URL;
    // const navigate = useNavigate();

    // const { token } = useContext(AuthContext);

 

    return (
        <DashBoardLayout>
            <section className="bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 mx-4 sm:mx-6 lg:mx-2  pt-2 pb-8 px-4 rounded-lg sm:px-6 lg:px-8">
                <h1>Inicio</h1>
            </section>
        </DashBoardLayout>
    );
};
