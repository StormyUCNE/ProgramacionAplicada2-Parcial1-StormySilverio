import { Router } from "express";
import { login, registro } from "../controllers/auth.controller.js";
import { validarCreacionUsuario, validarLogin } from "../middlewares/validaciones.middleware.js";

const router = Router();

router.post("/registro", validarCreacionUsuario, registro)
router.post("/login", validarLogin, login)

export default router;