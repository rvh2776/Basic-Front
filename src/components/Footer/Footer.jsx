import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";

export const Footer = () => {

  return (
    <>
      <footer>
        {/* <div
            className="absolute inset-0 z-0 opacity-100"
            style={{
              backgroundImage: "url('https://www.transparenttextures.com/patterns/skulls.png')",
              backgroundRepeat: "repeat",
            }}
        ></div> */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-semibold mb-2">Nombre de la Aplicación</h3>
              <p>¡Description de la Aplicación!</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors duration-300">
                <span className="sr-only">WhatsApp</span>
                <FaWhatsapp className="w-9 h-9" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors duration-300">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="w-9 h-9" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="w-9 h-9" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="w-9 h-9" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
            <p className="flex justify-center gap-3">
              © {new Date().getFullYear()} Rafael V.H.
              <a href="https://www.linkedin.com/in/rafael-velazquez-25a928165/" target="_blank" className="text-2xl hover:text-blue-500"><FaLinkedin /></a>
              <a href="https://github.com/rvh2776" target="_blank" className="text-2xl hover:text-blue-500"><FaGithub /></a>
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};
