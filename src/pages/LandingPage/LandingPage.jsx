import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";

const LandingPage = () => {



  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-gradient-to-t from-gray-900 to-gray-700 p-8 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-xl font-bold">Nombre</span>
          <ul className="flex space-x-4">
            <li><a href="#inicio" className="hover:text-blue-400">Inicio</a></li>
            <li><a href="#link1" className="hover:text-blue-400">Link 1</a></li>
            <li><a href="#link2" className="hover:text-blue-400">Link 2</a></li>
            <li><a href="#link3" className="hover:text-blue-400">Link 3</a></li>
          </ul>
          <button className="hover:text-blue-400">
            <Link to='/auth/login'>
              Login
            </Link></button>
        </div>
      </nav>

      <section className="h-screen flex items-center justify-center bg-gray-800">

        <div className="text-center">

          <h1 className="text-5xl font-bold">Landing Page Inicial</h1>
          <p className="mt-4 text-xl">Para empezar de cero un proyecto</p>
          <button className="mt-8 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
            <Link to='snake'>
              Juega a SNAKE
            </Link>
          </button>
        </div>

      </section>

      <section className="relative bg-gradient-to-t from-gray-800 to-gray-900 text-white py-8 overflow-hidden">
          <Footer/>
      </section>
    </div>
  );
};

export default LandingPage;