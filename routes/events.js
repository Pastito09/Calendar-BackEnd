/*
    Event Routes
    /api/events
*/

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { Router } = require('express');  

const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();
// Todas las rutas tienen que pasar por la validacion del JWT
router.use( validarJWT ); // todas las rutas que estan debajo de esta declaracion, tienen 'validarJWT' como middleware


router.get('/', getEventos);

// crear un nuevo evento

router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha final es obligatoria').custom( isDate ),


    validarCampos
],
crearEvento);

// Actualizar evento
router.put('/:id', actualizarEvento );

//Borrar evento
router.delete('/:id', eliminarEvento )

module.exports = router;