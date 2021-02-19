const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, postMedico, putMedico, deleteMedico } = require('../controllers/medicos');

const router = Router();


router.get('/', getMedicos);

router.post('/', [
    validarJWT,
    check('nombre','El nombre del medico es necesario').not().isEmpty(),
    check('hospital','El hospital id debe ser valido').isMongoId(),
    validarCampos] , postMedico);


router.put('/:id', [
    validarJWT,
    check('nombre','El nombre del medico es necesario').not().isEmpty(),
    check('hospital','El hospital id debe ser valido').isMongoId(),
    validarCampos
], putMedico);


router.delete('/:id', validarJWT, deleteMedico);



module.exports = router;