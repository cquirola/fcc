const express = require('express');
const router = express.Router();
const tipo_normativaController = require('../../controllers/comunidad.controllers/tipo_normativa.controller');

router
    .get('/', tipo_normativaController.get)
    .get('/:id', tipo_normativaController.getById)
    .post('/', tipo_normativaController.create)
    .put('/:id', tipo_normativaController.update)
    .delete('/:id', tipo_normativaController._delete);

module.exports = router;
