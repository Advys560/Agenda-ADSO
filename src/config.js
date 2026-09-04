// Archivo: src/config.js
// Este archivo centraliza configuraciones reutilizables de la Agenda ADSO.

// URL base del backend local de Agenda ADSO.
// Si cambia el puerto o la ruta, solo se modifica aquí.
export const API_BASE_URL = "http://localhost:3002/contactos";

// Información general de la aplicación que se utilizará en App.jsx
export const APP_INFO = {
  curso: "Desarrollo Web ReactJS",
  ficha: "3223876",
  titulo: "Agenda ADSO v7",
  subtitulo:
    "Gestión de contactos conectada a una API local con JSON Server, con validaciones y mejor experiencia de usuario.",
  mensajeCargando: "Cargando contactos...",
  mensajeSinContactos:
    "Aún no tienes contactos registrados. Agrega el primero usando el formulario superior.",
  footer: "Desarrollo Web – ReactJS | Proyecto Agenda ADSO",
  instructor: "Gustavo Adolfo Bolaños Dorado",
};
