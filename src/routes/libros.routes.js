import { Router } from "express";
import { crearLibro, eliminarLibro, obtenerLibros } from "../controllers/libros.controller.js";
import { validarCreacionLibro } from "../middlewares/validaciones.middleware.js";

const router = Router();

router.get("/", obtenerLibros);
router.post("/", validarCreacionLibro, crearLibro);
router.delete("/:id", eliminarLibro);

export default router;