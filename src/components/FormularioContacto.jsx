import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  // Estado del formulario como objeto único controlado
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  // onChange genérico: actualiza el campo según "name"
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // onSubmit: valida mínimos y llama al padre
  const onSubmit = (e) => {
    e.preventDefault(); // Evita recarga de la página
    // Validación mínima: 3 campos obligatorios
    if (!form.nombre || !form.telefono || !form.correo) return;
    // Llamamos la función del padre para crear
    onAgregar(form);
    // Reseteamos el formulario
    setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:p-8"
    >
      <div className="border-b border-slate-100 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
          Nuevo contacto
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Agrega una persona a tu agenda
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Completa los datos principales para guardarlo.
        </p>
      </div>

      {/* Grid: 1 columna en móvil, 2 en pantallas medianas+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo: Nombre */}
        <div>
          <label
            htmlFor="nombre"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Nombre
          </label>
          <input
            id="nombre"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
            name="nombre"
            placeholder="Ej: Camila Pérez"
            value={form.nombre}
            onChange={onChange}
          />
        </div>

        {/* Campo: Teléfono */}
        <div>
          <label for="Telefono" className="mb-2 block text-sm font-semibold text-slate-700">
            Teléfono 
          </label>
          <input
          id="Telefono"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
            name="telefono"
            placeholder="Ej: 300 123 4567"
            value={form.telefono}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Campo: Correo */}
      <div>
        <label for="correo"className="mb-2 block text-sm font-semibold text-slate-700">
          Correo 
        </label>
        <input
        id="correo"
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />
      </div>

      {/* Campo: Etiqueta opcional */}
      <div>
        <label for="etiqueta"
          className="mb-2 block text-sm font-semibold text-slate-700">
          Etiqueta (opcional)
        </label>
        <input
          id="etiqueta"
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      {/* Botón principal con color morado y hover */}
      <button className="w-full rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-200 md:w-auto">
        Agregar contacto
      </button>
    </form>
  );
}
