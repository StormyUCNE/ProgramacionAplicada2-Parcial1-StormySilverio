import "dotenv/config"
import jwt from "jsonwebtoken"
export const verificarToken = (req, res, next)=>{
    const header = req.headers["authorization"];
    if(!header)
        return res.status(401).json({error: "Token requerido"});
    const token = header.split(" ")[1];
    if(!token)
        return res.status(401).json({error: "Token requerido"});
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario=verify;
        next();
    } catch (error) {
        res.status(401).json({error: "Token Invalido"});
    }
}