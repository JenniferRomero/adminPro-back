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


const putMedico = async(req, res= response) => {

    const uid = req.id;
    const medicoId = req.params.id;
    
    try {
        const medicoDB = await Medico.findById( medicoId );

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "Medico no encontrado"
            });
        } 

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(medicoId, cambiosMedico, {new: true})  

        
        res.json({
            ok: true,
            medicoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
}


const deleteMedico = async(req, res= response) => {
    const medicoId = req.params.id;
    try {
        const medicoDB = await Medico.findById( medicoId );
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "medico no encontrado"
            });
        } 

        await Medico.findByIdAndDelete( medicoId )
        
        res.json({
            ok:true,
            msg: 'medico eliminado'
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
}


const getMedicoById = async(req, res= response) => {
    
    const medicoId = req.params.id;

    try {
        const medico = await Medico.findById(medicoId)
        .populate('usuario','nombre img').populate('hospital','nombre img');
    
        res.json({
            ok: true,
            medico
        });
    } catch (error) {
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        });
    }


}


module.exports = {
    getMedicos,
    postMedico,
    putMedico,
    deleteMedico,
    getMedicoById
}