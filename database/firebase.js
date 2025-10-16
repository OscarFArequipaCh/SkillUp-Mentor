// config/firebase.js
import admin from "firebase-admin";
import { readFileSync } from "fs";

// Cargar las credenciales
const serviceAccount = JSON.parse(
  readFileSync("./config/skillup-app-5f6e3-firebase-adminsdk-fbsvc-b0080d6c06.json", "utf8")
);

// Inicializar la app Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Exportar la referencia a Firestore
export const db = admin.firestore();
