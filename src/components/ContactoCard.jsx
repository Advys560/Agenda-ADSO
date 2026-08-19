export default function ContactoCard({
  nombre,
  telefono,
  correo,
  etiqueta,
  onEliminar,
}) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{nombre}</h3>
      <p className="text-gray-700 mb-1">📞 {telefono}</p>
      <p className="text-gray-700 mb-1">✉️ {correo}</p>
      {etiqueta && <p className="text-gray-600">{etiqueta}</p>}
      <div className="flex justify-start">
        <button
          onClick={() => onEliminar(correo)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium
px-4 py-2 rounded-lg transition-colors"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
