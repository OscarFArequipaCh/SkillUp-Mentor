// controllers/userController.js
import { userService } from "../services/userService.js";

export const userController = {
  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async findByEmail(req, res) {
    try {
      const { email } = req.query;
      const user = await userService.getUserByEmail(email);
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async findByRole(req, res) {
    try {
      const { role } = req.query;
      const users = await userService.getUsersByRole(role);
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async findByRegion(req, res) {
    try {
      const { region } = req.query;
      const users = await userService.getUsersByRegion(region);
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
