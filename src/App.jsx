import { useState } from "react";
import "./App.css";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

export default function App() {
  const [contactos, setContactos] = useState([
    {
      id: 1,
      nombre: "Carolina Pérez",
      telefono: "300 123 4567",
      correo: "carolina@sena.edu.co",
      etiqueta: "Compañera",
    },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, { id: Date.now(), ...nuevo }]);
  };

  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  const abrirActualizar = (contacto) => {
    setContactoSeleccionado(contacto);
    setMostrarFormulario(true);
  };

  const guardarContacto = (datos) => {
    if (contactoSeleccionado) {
      setContactos((prev) =>
        prev.map((c) =>
          c.id === contactoSeleccionado.id ? { ...c, ...datos } : c
        )
      );
    } else {
      agregarContacto(datos);
    }

    setMostrarFormulario(false);
    setContactoSeleccionado(null);
  };

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v2</h1>

      <FormularioContacto onAgregar={agregarContacto} />

      <section className="lista-contactos">
        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            id={c.id}
            nombre={c.nombre}
            telefono={c.telefono}
            correo={c.correo}
            etiqueta={c.etiqueta}
            onDelete={eliminarContacto}
            onActualizar={abrirActualizar}
          />
        ))}
      </section>

      {mostrarFormulario && (
        <div className="modal-fondo">
          <div className="modal">
            <button
              className="btn-cerrar"
              onClick={() => {
                setMostrarFormulario(false);
                setContactoSeleccionado(null);
              }}
            >
              X
            </button>

            <h2>{contactoSeleccionado ? "Actualizar contacto" : "Agregar contacto"}</h2>

            <FormularioContacto
              contacto={contactoSeleccionado}
              onGuardar={guardarContacto}
            />
          </div>
        </div>
      )}
    </main>
  );
}
