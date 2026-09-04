// Archivo: src/api.js
// Capa de acceso a datos de Agenda ADSO (llamados a la API REST).

// Importamos la URL base desde config.js
import { API_BASE_URL } from "./config";

const buildContactosUrl = (id = null) => {
  if (id === null || id === undefined) return API_BASE_URL;
  return `${API_BASE_URL}/${id}`;
};

// Función GET: listar contactos
export async function listarContactos() {
  const res = await fetch(buildContactosUrl());

  if (!res.ok) throw new Error("Error al listar contactos");

  return res.json();
}

// Función POST: crear un nuevo contacto
export async function crearContacto(data) {
  const res = await fetch(buildContactosUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear el contacto");

  return res.json();
}

// Función DELETE: eliminar contacto por id
export async function eliminarContactoPorId(id) {
  const res = await fetch(buildContactosUrl(id), { method: "DELETE" });

  if (!res.ok) throw new Error("Error al eliminar el contacto");

  return true;
}
