
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export const BotonUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Observador para detectar cuando la imagen está en el viewport
    const targetElement = document.querySelector("#inicio"); // Cambiar el selector por el ID o clase de la imagen objetivo
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Ajusta el porcentaje de visibilidad que activa el evento
      }
    );

    if (targetElement) {
      observer.observe(targetElement);
    }

    // Detecta el scroll para mostrar u ocultar el botón
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      if (targetElement) observer.unobserve(targetElement);
    };
  }, []);

  return (
    <div>
      {isVisible && !isIntersecting && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-orange-500/60 text-white rounded-full shadow-lg hover:bg-orange-600 transition-opacity z-20"
          style={{ opacity: isIntersecting ? 0 : 1, transition: "opacity 0.3s" }}
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};
