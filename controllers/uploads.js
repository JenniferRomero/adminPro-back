const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require('../helpers/update-image');

const cargarArchivo = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ["medicos", "hospitales", "usuarios"];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "El tipo no coincide",
    });
  }

  //validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "no hay ningun archivo",
    });
  }

  //Procesar archivo

  const file = req.files.imagen;
  const nombreCorto = file.name.split(".");
  const extensionArchivo = nombreCorto[nombreCorto.length - 1];

  // validar Extension

  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "no es una extension permitida",
    });
  }

  //Generar el nombre del archivo
  const nameFile = `${uuidv4()}.${extensionArchivo}`; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

  const path = `./uploads/${tipo}/${nameFile}`;

  //mover imagen
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: "error al mover la imagen",
      });
    }

    actualizarImagen( tipo, id, nameFile); 

    res.json({
      ok: true,
      msg: "Archivo subido",
      nameFile,
    });
  });
};


const retornaImagen = (req, res= response) => {

  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImagen = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  //imagen por defecto
  if (fs.existsSync(pathImagen)){
    res.sendFile(pathImagen);
  } else {
    const pathImagen = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImagen);
  }

}

module.exports = {
  cargarArchivo,
  retornaImagen
};
