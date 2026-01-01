const express = require('express');
const router = express.Router();
const documentacionController = require('../../controllers/comunidad.controllers/documentacion.controller');
const multerConfigDocumentacion = require('../../utils/multerConfigDocumentacion');
const multer = require('multer');
const upload = multer(multerConfigDocumentacion);

router
    .get('/', documentacionController.get)
    .get('/:id', documentacionController.getById)
    .post('/', upload.single('archivo_url_documentacion'), documentacionController.create)
    .put('/:id', documentacionController.update)
    .delete('/:id', documentacionController._delete);


module.exports = router;
