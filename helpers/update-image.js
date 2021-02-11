const fs = require('fs');

const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
      fs.unlinkSync(path);
  }
}

const actualizarImagen = async( tipo, id, nameFile ) => {
let pathViejo = '';

switch (tipo) {
    case 'medicos':
        const medico = await Medico.findById(id);
        if (!medico) {
            console.log('no es un medico');
            return false;
        }
        
        pathViejo= `./uploads/medicos/${medico.img}`;

        borrarImagen(pathViejo);

        medico.img = nameFile;
        await medico.save();
        return true;

      break;
    case 'hospitales':
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            console.log('no es un hospital');
            return false;
        }
        
        pathViejo= `./uploads/hospitales/${hospital.img}`;

        borrarImagen(pathViejo);

        hospital.img = nameFile;
        await hospital.save();
        return true;

      break;
    case 'usuarios':
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            console.log('no es un usuario');
            return false;
        }
        
        pathViejo= `./uploads/usuarios/${usuario.img}`;

        borrarImagen(pathViejo);

        usuario.img = nameFile;
        await usuario.save();
        return true;

      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: 'colección no coincide con usuarios, medicos o hospitales'
      })
}
}


module.exports = {
    actualizarImagen
}