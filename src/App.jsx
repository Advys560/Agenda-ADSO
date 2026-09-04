// Archivo: src/App.jsx
// Componente principal de la aplicación Agenda ADSO.
// Se encarga de:
// - Cargar la lista de contactos desde la API.
// - Manejar estados globales (contactos, carga, error).
// - Conectar el formulario y las tarjetas de contactos.

// Importamos hooks de React
import { useEffect, useState } from "react";

import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";
import { APP_INFO } from "./config";

import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  const [contactos, setContactos] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setEstaCargando(true);
        setMensajeError("");

        const lista = await listarContactos();
        setContactos(lista);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setMensajeError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setEstaCargando(false);
      }
    };

    cargarContactos();
  }, []);

  const agregarContacto = async (nuevoContacto) => {
    try {
      setMensajeError("");
      const contactoCreado = await crearContacto(nuevoContacto);
      setContactos((contactosActuales) => [...contactosActuales, contactoCreado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);
      setMensajeError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );
      throw error;
    }
  };

  const eliminarContacto = async (idContacto) => {
    try {
      setMensajeError("");
      await eliminarContactoPorId(idContacto);
      setContactos((contactosActuales) =>
        contactosActuales.filter((contacto) => contacto.id !== idContacto)
      );
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setMensajeError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            {APP_INFO.curso} Ficha {APP_INFO.ficha}
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {APP_INFO.titulo}
          </h1>
          <p className="text-sm text-gray-600 mt-1">{APP_INFO.subtitulo}</p>
        </header>

        {mensajeError && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{mensajeError}</p>
          </div>
        )}

        {estaCargando ? (
          <p className="text-sm text-gray-500">{APP_INFO.mensajeCargando}</p>
        ) : (
          <>
            <FormularioContacto onAgregar={agregarContacto} />

            <section className="space-y-4">
              {contactos.length === 0 ? (
                <p className="text-sm text-gray-500">
                  {APP_INFO.mensajeSinContactos}
                </p>
              ) : (
                contactos.map((contacto) => (
                  <ContactoCard
                    key={contacto.id}
                    nombre={contacto.nombre}
                    telefono={contacto.telefono}
                    correo={contacto.correo}
                    etiqueta={contacto.etiqueta}
                    onEliminar={() => eliminarContacto(contacto.id)}
                  />
                ))
              )}
            </section>
          </>
        )}

        <footer className="mt-8 text-xs text-gray-400">
          <p>{APP_INFO.footer}</p>
          <p>Instructor: {APP_INFO.instructor}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
