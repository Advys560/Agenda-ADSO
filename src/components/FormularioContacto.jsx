import { useState } from "react";

function FormularioContacto({ onAgregar }) {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const [erroresValidacion, setErroresValidacion] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  const [estaEnviando, setEstaEnviando] = useState(false);

  const manejarCambioCampo = (evento) => {
    const { name, value } = evento.target;

    setDatosFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));

    if (name in erroresValidacion && erroresValidacion[name]) {
      setErroresValidacion((prevErrores) => ({
        ...prevErrores,
        [name]: "",
      }));
    }
  };

  const validarDatosFormulario = () => {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    if (!datosFormulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    const telefono = datosFormulario.telefono.trim();
    if (!telefono) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (!/^[0-9+()\s-]{7,20}$/.test(telefono)) {
      nuevosErrores.telefono = "Ingresa un teléfono válido.";
    }

    if (!datosFormulario.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosFormulario.correo.trim())) {
      nuevosErrores.correo = "Ingresa un correo válido.";
    }

    setErroresValidacion(nuevosErrores);
    return !nuevosErrores.nombre && !nuevosErrores.telefono && !nuevosErrores.correo;
  };

  const manejarEnvioFormulario = async (evento) => {
    evento.preventDefault();

    const formularioEsValido = validarDatosFormulario();
    if (!formularioEsValido) return;

    try {
      setEstaEnviando(true);

      // La operación puede tardar un poco porque depende de la API local.
      await onAgregar(datosFormulario);

      setDatosFormulario({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });

      setErroresValidacion({
        nombre: "",
        telefono: "",
        correo: "",
      });
    } finally {
      setEstaEnviando(false);
    }
  };

  return (
    <form
      className="bg-white shadow-sm rounded-2xl p-6 space-y-4 mb-8"
      onSubmit={manejarEnvioFormulario}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Nuevo contacto</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="nombre"
          placeholder="Ej: Camila Pérez"
          value={datosFormulario.nombre}
          onChange={manejarCambioCampo}
        />
        {erroresValidacion.nombre && (
          <p className="mt-1 text-xs text-red-600">{erroresValidacion.nombre}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="telefono"
          placeholder="Ej: 300 123 4567"
          value={datosFormulario.telefono}
          onChange={manejarCambioCampo}
        />
        {erroresValidacion.telefono && (
          <p className="mt-1 text-xs text-red-600">{erroresValidacion.telefono}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={datosFormulario.correo}
          onChange={manejarCambioCampo}
        />
        {erroresValidacion.correo && (
          <p className="mt-1 text-xs text-red-600">{erroresValidacion.correo}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiqueta (opcional)
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={datosFormulario.etiqueta}
          onChange={manejarCambioCampo}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={estaEnviando}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700
                     disabled:bg-purple-300 disabled:cursor-not-allowed
                     text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
        >
          {estaEnviando ? "Guardando..." : "Agregar contacto"}
        </button>
      </div>
    </form>
  );
}

export default FormularioContacto;
