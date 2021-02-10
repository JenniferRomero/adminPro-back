const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
  // const users = await Usuario.find({}, 'nombre email role google');
  const users = await Usuario.find();

  res.json({
    ok: true,
    users
  });
};

const postUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        return resp.status(400).json({
            ok: false,
            msg: 'El correo ya esta registrado'
        });
    }

    const user = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //guardarUsuario
    await user.save();

    
    
    const token = await generarJWT(user.id);


    res.json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Error inesperado revisar logs",
    });
  }
};


const putUsuario = async (req, res = response) => {
  // TODO: Validar token  y comporbar si es el usuairo correcto

  const id =  req.params.id;
  
  try {  
    const usuarioDB = await Usuario.findById( id );
    if (!usuarioDB) {
      return res  .status(404).json({
        ok: false,
        msg: 'No existe un usuario por ese id'
      });
    }
    //const campos = req.body;
    const { pasword, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {

      const existeEmail = await Usuario.findOne({ email: email });
      if (existeEmail) {
        return res.json({
          ok: false,
          msg: 'Ya existe un usuario con ese email'
        });
      }
    }

    campos.email = email;

    // delete campos.password;
    // delete campos.google;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, {new: true});

    res.json({
      ok: true,
      usuario: usuarioActualizado
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Error inesperado' 
    });
  }

};

const deleteUsuario = async (req, res = response) =>{
  
  const id =  req.params.id;

  try {
    const usuarioDB = await Usuario.findById( id );
    if (!usuarioDB) {
      return res  .status(404).json({
        ok: false,
        msg: 'No existe un usuario por ese id'
      });
    }

    await Usuario.findByIdAndDelete(id);

    res.json({
      ok:true,
      msg: 'Usuario Eliminado'
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    })
  }
}

module.exports = {
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario
};
