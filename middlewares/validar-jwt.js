const { response } = require('express');
const jwt = require('jsonwebtoken');



const validarJWT = (req, res = response, next) => {

    // leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        req.id = id;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        });
    }

}

module.exports = {
    validarJWT
}