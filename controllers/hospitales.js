const { response } = require("express");
const hospital = require("../models/hospital");
const Hospital = require("../models/hospital");

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
    .populate('usuario','nombre img');

    res.json({
        ok: true,
        hospitales
    });
};

const postHospital = async(req, res = response) => {
    const id = req.id;
    
    const hosp = new Hospital({
        usuario: id,
        ...req.body});

    try {
        const hospitaltDB = await hosp.save();
    
        res.json({
            ok: true,
            hospital: hospitaltDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
};

const putHospital = async(req, res = response) => {

    const uid = req.id;
    const hospitalId = req.params.id;

    try {
        const hospitalDB = await Hospital.findById( hospitalId );

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: "Hospital no encontrado"
            });
        } 

        //update
        //hospitalDB.nombre = req.body.nombre;
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospital, {new: true})  

        
        res.json({
            ok: true,
            hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
};

const deleteHospital = async(req, res = response) => {
    
    const hospitalId = req.params.id;

    try {
        const hospitalDB = await Hospital.findById( hospitalId );

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: "Hospital no encontrado"
            });
        } 

        await Hospital.findByIdAndDelete( hospitalId )
        
        res.json({
            ok: true,
            msg: 'hospital eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
};

module.exports = {
    getHospitales,
    postHospital,
    putHospital,
    deleteHospital,
};
