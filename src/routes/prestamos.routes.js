import { Router } from "express";
import { crearPrestamo, devolverPrestamo, obtenerPrestamosAdmin, obtenerPrestamosPropios } from "../controllers/prestamo.controller.js";
import { validarLibroId } from "../middlewares/validaciones.middleware.js";

const router = Router();

router.post("/", validarLibroId, crearPrestamo)
router.put("/:id/devolver", devolverPrestamo)
router.get("/", obtenerPrestamosAdmin)
router.get("/mis-prestamos", obtenerPrestamosPropios)

export default router;