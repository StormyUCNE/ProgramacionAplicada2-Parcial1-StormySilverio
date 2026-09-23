export const validarCreacionLibro=(req, res, next)=>{
    if(!req.body.titulo || !req.body.autor)
        return res.status(400).json({error: "Titulo y autor son campos requeridos"});
    if(typeof req.body.titulo != "string" || typeof req.body.autor != "string")
        return res.status(400).json({error: "Titulo y autor deben de ser cadena de texto"});
    next();
}

export const validarCreacionUsuario=(req, res, next)=>{
    if(!req.body.nombre || !req.body.email || !req.body.password)
        return res.status(400).json({error: "nombre, email y password son campos requeridos"});
    if(typeof req.body.nombre != "string" || typeof req.body.email != "string" || typeof req.body.password != "string")
        return res.status(400).json({error: "nombre, email y password deben de ser cadena de texto"});
    next();
}

export const validarLogin=(req, res, next)=>{
    if(!req.body.email || !req.body.password)
        return res.status(400).json({error: "email y password son campos requeridos"});
    if(typeof req.body.email != "string" || typeof req.body.password != "string")
        return res.status(400).json({error: "email y password deben de ser cadena de texto"});
    next();
}

export const validarLibroId=(req, res, next)=>{
    if(!req.body.libroId)
        return res.status(400).json({error: "libroId campo requerido"});
    if(typeof req.body.libroId != "number")
        return res.status(400).json({error: "libroId deben de ser numero"});
    next();
}