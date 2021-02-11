const { response } = require('express');
const Medico = require('../models/medico');


const getMedicos = async(req, res= response) => {
    
    const medicos = await Medico.find()
    .populate('usuario','nombre img').populate('hospital','nombre img');

    res.json({
        ok: true,
        medicos
    });
}

const postMedico = async(req, res= response) => {

    const id = req.id;

    
    const medico = new Medico({
        usuario: id,
        ...req.body});


    try {
        const medicoDB = await medico.save();
    
        res.json({
            ok: true,
            medico: medicoDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}


const putMedico = (req, res= response) => {
    res.json({
        ok:true,
        msg: 'hola'
    });
}


const deleteMedico = (req, res= response) => {
    res.json({
        ok:true,
        msg: 'hola'
    });
}


module.exports = {
    getMedicos,
    postMedico,
    putMedico,
    deleteMedico
}