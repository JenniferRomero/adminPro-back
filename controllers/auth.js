 const { response } = require('express'); 
 const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');
 
 const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        } 

        //Verificar clave

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return res.status(404).json({
                ok:false,
                msg: 'Contraseña no valida'
            })
        }

        //Generar un token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con le administrador'
        })
    }
 }


 
 const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { email, name, picture } = await googleVerify(googleToken);
        const usuarioDB = await Usuario.findOne({email});
        let user;

        if (!usuarioDB) {
            user = new Usuario({
                email,
                nombre: name,
                password: 'fdsf',
                img: picture,
                google: true
            });
        } else {
            user = usuarioDB;
            user.google = true
        }

        //guardar en base de datos
        await user.save();

        
        //Generar un token
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'token no es correcto'
        })
    }
 }

 
 const renewToken = async(req, res = response) => {

    const uid = req.id; 

    try {

        //Generar un token
        const token = await generarJWT( uid );

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'token no es correcto'
        })
    }
 }

 module.exports = {
     login,
     googleSignIn,
     renewToken
 }