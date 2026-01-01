const express = require('express');
const router = express.Router();
const tipo_documentacionController = require('../../controllers/comunidad.controllers/tipo_documentacion.controller');

router
    .get('/', tipo_documentacionController.get)
    .get('/:id', tipo_documentacionController.getById)
    .post('/', tipo_documentacionController.create)
    .put('/:id', tipo_documentacionController.update)
    .delete('/:id', tipo_documentacionController._delete);

module.exports = router;
