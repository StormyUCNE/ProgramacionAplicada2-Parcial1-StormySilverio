import "dotenv/config"
import {prisma} from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export const registro =async(req, res)=>{
    try {
        const {nombre, email, password, rol} = req.body;

        const existeUsuario = await prisma.usuario.findUnique({where:{email}});
        if(existeUsuario)
            return res.status(401).json({error: "Usuario ya existe"});

        const hash = await bcrypt.hash(password, 10);

        const usuario = await prisma.usuario.create({data:{nombre: nombre, email: email, password: hash, rol: rol}});
        return res.status(201).json({id: usuario.id, nombre: usuario.nombre, rol: usuario.rol});

    } catch (error) {
        console.log("Error en el servidor", error);
        return res.status(500).json("Error al registrar usuario");
    }
}

export const login =async(req, res)=>{
    try {
        const {email, password} = req.body;
        const existeUsuario = await prisma.usuario.findUnique({where:{email}});
        if(!existeUsuario)
             return res.status(401).json({error: "Credenciales Incorrectas"});
        
        const decode = await bcrypt.compare(password, existeUsuario.password);
        if(!decode)
             return res.status(401).json({error: "Credenciales Incorrectas"});

        const token = jwt.sign(
            {id: existeUsuario.id, email: existeUsuario.email, rol: existeUsuario.rol},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )

        return res.json({token});

    } catch (error) {
        console.log("Error en el servidor", error);
        return res.status(500).json("Error al login usuario");
    }
}