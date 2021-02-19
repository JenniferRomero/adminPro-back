const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, postHospital, putHospital, deleteHospital } = require('../controllers/hospitales');


const router = Router();


router.get('/', getHospitales);

router.post('/', [
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
] , postHospital);


router.put('/:id', [
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], putHospital);


router.delete('/:id', validarJWT, deleteHospital);



module.exports = router;