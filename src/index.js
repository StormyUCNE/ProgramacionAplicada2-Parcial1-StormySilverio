import "dotenv/config"
import express from "express"
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import authRoutes from "./routes/auth.routes.js"
import librosRoutes from "./routes/libros.routes.js"
import prestamosRoutes from "./routes/prestamos.routes.js"
import { verificarToken } from "./middlewares/auth.middleware.js";

const app = express();
app.use(express.json());
app.use(loggerMiddleware);
const PORT = process.env.PORT || 3000

app.use("/auth", authRoutes);
app.use("/libros", verificarToken, librosRoutes);
app.use("/prestamos", verificarToken, prestamosRoutes);


app.listen(PORT, ()=>{console.log(`Puerto corriendo en ${PORT}`)});