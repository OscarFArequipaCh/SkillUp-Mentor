// services/userService.js
import { userRepository } from "../repositories/userRepository.js";

export const userService = {
  /**
   * Crear un nuevo usuario
   * - Valida que no exista el email
   * - Define el rol por defecto si no se envía
   * - Normaliza los datos
   */
  async createUser(data) {
    if (!data.email || !data.password || !data.name) {
      throw new Error("Faltan campos obligatorios: name, email o password.");
    }

    // Verificar si ya existe
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("El email ya está registrado.");
    }

    // Normalizar
    const newUser = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      password: data.password, // Aquí luego deberías encriptarla con bcrypt
      role: data.role || "apprentice",
      photo: data.photo || null,
      region: data.region || "Sin especificar",
      dateCreated: new Date().toISOString(),
    };

    const id = await userRepository.create(newUser);
    return { id, ...newUser };
  },

  /**
   * Obtener todos los usuarios
   */
  async getAllUsers() {
    return await userRepository.findAll();
  },

  /**
   * Obtener usuario por ID
   */
  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error("Usuario no encontrado.");
    return user;
  },

  /**
   * Buscar por email
   */
  async getUserByEmail(email) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Usuario no encontrado.");
    return user;
  },

  /**
   * Actualizar usuario
   */
  async updateUser(id, updates) {
    const existing = await userRepository.findById(id);
    if (!existing) throw new Error("Usuario no encontrado.");

    // Evitar sobrescribir email o id
    delete updates.id;
    delete updates.email;

    return await userRepository.update(id, updates);
  },

  /**
   * Eliminar usuario
   */
  async deleteUser(id) {
    const existing = await userRepository.findById(id);
    if (!existing) throw new Error("Usuario no encontrado.");
    return await userRepository.remove(id);
  },

  /**
   * Buscar usuarios por rol
   */
  async getUsersByRole(role) {
    if (!role) throw new Error("Debe especificar un rol.");
    return await userRepository.findByRole(role);
  },

  /**
   * Buscar usuarios por región
   */
  async getUsersByRegion(region) {
    if (!region) throw new Error("Debe especificar una región.");
    return await userRepository.findByRegion(region);
  },
};
