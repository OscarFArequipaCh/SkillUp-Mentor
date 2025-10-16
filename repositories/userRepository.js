// repositories/userRepository.js
import { db } from "../database/firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp
} from "firebase/firestore";

const USERS_COL = "users";
const usersCollectionRef = collection(db, USERS_COL);

const mapDoc = (docSnap) => {
  return { id: docSnap.id, ...docSnap.data() };
};

export const userRepository = {
  /**
   * Crea un usuario en Firestore.
   * @param {Object} userData - Objeto con los campos del usuario (name, email, role, etc.)
   * @returns {string} id del documento creado
   */
  async create(userData) {
    try {
      const payload = {
        ...userData,
        dateCreated: userData.dateCreated || new Date().toISOString()
      };
      const ref = await addDoc(usersCollectionRef, payload);
      return ref.id;
    } catch (err) {
      console.error("userRepository.create:", err);
      throw err;
    }
  },

  /**
   * Obtener todos los usuarios (sin paginación).
   * Úsalo solo para entornos de prueba o cuando la colección sea pequeña.
   * @returns {Array<Object>}
   */
  async findAll() {
    try {
      const snapshot = await getDocs(usersCollectionRef);
      return snapshot.docs.map(mapDoc);
    } catch (err) {
      console.error("userRepository.findAll:", err);
      throw err;
    }
  },

  /**
   * Buscar usuario por id
   * @param {string} id
   * @returns {Object|null}
   */
  async findById(id) {
    try {
      const docRef = doc(db, USERS_COL, id);
      const snap = await getDoc(docRef);
      return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    } catch (err) {
      console.error("userRepository.findById:", err);
      throw err;
    }
  },

  /**
   * Buscar usuario por email (asume que email es único)
   * @param {string} email
   * @returns {Object|null}
   */
  async findByEmail(email) {
    try {
      const q = query(usersCollectionRef, where("email", "==", email), limit(1));
      const snap = await getDocs(q);
      if (snap.empty) return null;
      const d = snap.docs[0];
      return { id: d.id, ...d.data() };
    } catch (err) {
      console.error("userRepository.findByEmail:", err);
      throw err;
    }
  },

  /**
   * Actualiza campos de un usuario
   * @param {string} id
   * @param {Object} changes
   */
  async update(id, changes) {
    try {
      const ref = doc(db, USERS_COL, id);
      // No usamos setDoc para evitar sobrescribir campos no enviados
      await updateDoc(ref, { ...changes, updatedAt: new Date().toISOString() });
      return await this.findById(id);
    } catch (err) {
      console.error("userRepository.update:", err);
      throw err;
    }
  },

  /**
   * Elimina un usuario (documento)
   * @param {string} id
   */
  async remove(id) {
    try {
      await deleteDoc(doc(db, USERS_COL, id));
      return true;
    } catch (err) {
      console.error("userRepository.remove:", err);
      throw err;
    }
  },

  /**
   * Consultar usuarios por rol (ej: 'mentor' | 'apprentice')
   * @param {string} role
   * @returns {Array<Object>}
   */
  async findByRole(role) {
    try {
      const q = query(usersCollectionRef, where("role", "==", role));
      const snap = await getDocs(q);
      return snap.docs.map(mapDoc);
    } catch (err) {
      console.error("userRepository.findByRole:", err);
      throw err;
    }
  },

  /**
   * Consulta paginada ordenada por dateCreated (descendente).
   * @param {number} pageSize
   * @param {Object|null} lastDocSnapshot - snapshot del último doc de la página anterior (opcional)
   * @returns {Object} { items: [], lastDoc: DocumentSnapshot|null }
   */
  async findPaged(pageSize = 20, lastDocSnapshot = null) {
    try {
      let q;
      if (lastDocSnapshot) {
        q = query(
          usersCollectionRef,
          orderBy("dateCreated", "desc"),
          startAfter(lastDocSnapshot),
          limit(pageSize)
        );
      } else {
        q = query(usersCollectionRef, orderBy("dateCreated", "desc"), limit(pageSize));
      }
      const snap = await getDocs(q);
      const items = snap.docs.map(mapDoc);
      const lastDoc = snap.docs.length ? snap.docs[snap.docs.length - 1] : null;
      return { items, lastDoc };
    } catch (err) {
      console.error("userRepository.findPaged:", err);
      throw err;
    }
  },

  /**
   * Buscar usuarios por region (ej: para filtros locales)
   * @param {string} region
   */
  async findByRegion(region) {
    try {
      const q = query(usersCollectionRef, where("region", "==", region));
      const snap = await getDocs(q);
      return snap.docs.map(mapDoc);
    } catch (err) {
      console.error("userRepository.findByRegion:", err);
      throw err;
    }
  }
};
