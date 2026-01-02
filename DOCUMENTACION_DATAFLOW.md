# Flujo de datos para formularios de Documentación

Este proyecto guarda lo que escribes en el formulario de Documentación a través de varios pasos:

1. **Formulario del cliente** (`cliente/src/modules/comunidad/views/AddDocumentacionView.js`)
   - Se arma un `FormData` con los campos (`codigo_documentacion`, `descripcion_documentacion`, etc.) y el archivo opcional en `archivo_url_documentacion`.
   - Se envía al API con `documentacionService.createDocumentacion` usando `multipart/form-data`.

2. **Servicio HTTP del cliente** (`cliente/src/services/documentacionService.js`)
   - Hace `POST ${API_URL}/documentacion` con el `FormData` tal cual, para que el backend reciba tanto campos de texto como el archivo.

3. **Ruta del backend** (`servidor/src/routes/comunidad.routes/documentacion.routes.js`)
   - Define `POST /documentacion` con `upload.single('archivo_url_documentacion')`, lo que usa Multer para procesar el archivo y ponerlo en `req.file`.

4. **Controlador del backend** (`servidor/src/controllers/comunidad.controllers/documentacion.controller.js`)
   - Copia los campos de `req.body` y, si llegó archivo, setea `data.archivo_url_documentacion` con la ruta `/uploads/comunidad/documentaciones/<nombre>`.
   - Llama a `service.create(data)` para insertar el registro completo (campos + URL del archivo) en la base de datos.

5. **Servicio de base de datos** (`servidor/src/services/comunidad.services/documentacion.service.js`)
   - Usa el modelo Sequelize `models.Documentacion` para ejecutar `create(data)` y guardar el registro en la tabla correspondiente.

Si quieres confirmar que un envío llegó a la base de datos, revisa estos archivos en este orden para ver cómo viajan los datos desde el formulario hasta el modelo.
