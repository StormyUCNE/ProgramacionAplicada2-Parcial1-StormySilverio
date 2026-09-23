import {prisma} from "../db.js"

export const crearPrestamo =async(req, res)=>{
    try {
        const {libroId} = req.body;

        const estaDisponible = await prisma.libro.findUnique({where:{id: libroId}});
        if(!estaDisponible.disponible)
            return res.status(400).json({error: "Libro no esta disponible"})

        const prestamo = await prisma.prestamo.create({data:{usuarioId: req.usuario.id, libroId}});
        await prisma.libro.update({where:{id:libroId}, data:{disponible:false}});
        return res.status(201).json({prestamo});
    } catch (error) {
        console.log("Error en el servidor", error);
        return res.status(500).json("Error al crear prestamo");
    }
}

export const devolverPrestamo =async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        
        const existePrestamo = await prisma.prestamo.findUnique({where:{id}});
        if(!existePrestamo)
            return res.status(404).json({error: "Libro no se encontró"});

        if(existePrestamo.usuarioId !== req.usuario.id)
            return res.status(403).json({error: "Permiso a devolver denegado"});

        const libro = await prisma.libro.findUnique({where:{id:existePrestamo.libroId}});
        await prisma.prestamo.update({where:{id}, data:{fechaFin: new Date()}});
        const libroActualizado = await prisma.libro.update({where:{id:libro.id}, data:{disponible:true}});
        return res.json({libroActualizado});
    } catch (error) {
        console.log("Error en el servidor", error);
        return res.status(500).json("Error al devolver libro");
    }
}

export const obtenerPrestamosAdmin =async(req, res)=>{
    try {
        if(req.usuario.rol !== "admin")
            return res.status(403).json("Permiso denegado");
        const prestamos = await prisma.prestamo.findMany({}); 
        return res.json({prestamos});
    } catch (error) {
        console.log("Error en el servidor", error);
        return res.status(500).json("Error al obtener prestamos");
    }
}

export const obtenerPrestamosPropios =async(req, res)=>{
    try {
        const where = {usuarioId: req.usuario.id};
        const prestamos = await prisma.prestamo.findMany({where: where}); 
        return res.json({prestamos});
    } catch (error) {
        console.log("Error en el servidor", error);
        return res.status(500).json("Error al obtener prestamos propios");
    }
}