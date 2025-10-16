import express from "express";
import { userController } from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/email", userController.findByEmail);
router.get("/role", userController.findByRole);
router.get("/region", userController.findByRegion);
router.get("/:id", userController.findById);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

export default router;
