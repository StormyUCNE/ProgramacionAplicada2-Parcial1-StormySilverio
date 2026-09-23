import { prisma } from "../db.js";

export const obtenerLibros =async(req, res)=>{
    try {
        const libros = await prisma.libro.findMany({});
        return res.json({libros});
    } catch (error) {
        console.log("Error en el servidor", error);
        return res.status(500).json("Error al obtener libros");
    }
}

export const crearLibro =async(req, res)=>{
    try {
        if(req.usuario.rol !== "admin")
            return res.status(403).json("Permiso denegado");
        const {titulo, autor} = req.body;
        const libro = await prisma.libro.create({data:{titulo, autor}});
        return res.status(201).json({libro});
    } catch (error) {
        console.log("Error en el servidor", error);
        return res.status(500).json("Error al crear libro");
    }
}

export const eliminarLibro =async(req, res)=>{
    try {
        if(req.usuario.rol !== "admin")
            return res.status(403).json("Permiso denegado");
        const id = parseInt(req.params.id);
        const existeLibro = await prisma.libro.findUnique({where:{id}});
        if(!existeLibro)
            return res.status(404).json({error: "Libro no se encontró"});
        await prisma.libro.delete({where:{id}});
        return res.json({mensaje:"Libro eliminado"});
    } catch (error) {
        console.log("Error en el servidor", error);
        return res.status(500).json("Error al eliminar libro");
    }
}