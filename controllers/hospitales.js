const { response } = require("express");
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

const putHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: "hola",
    });
};

const deleteHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: "hola",
    });
};

module.exports = {
    getHospitales,
    postHospital,
    putHospital,
    deleteHospital,
};
