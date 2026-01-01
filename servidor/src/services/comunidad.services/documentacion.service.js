const { models } = require('../../libs/sequelize');

class DocumentacionService  {

    constructor() {}

    buildDataWithFile(body, file, currentPath = null) {
      const data = { ...body };

      if (file) {
        data.archivo_url_documentacion = `/uploads/comunidad/documentaciones/${file.filename}`;
      } else if (!data.archivo_url_documentacion && currentPath) {
        data.archivo_url_documentacion = currentPath;
      } else if (!data.archivo_url_documentacion) {
        delete data.archivo_url_documentacion;
      }

      return data;
    }

    async find() {
      const res = await models.Documentacion.findAll();   //--- nombre del models = models.Provincia
      return res;
    }

    async findOne(id) {
      const res = await models.Documentacion.findByPk(id);
      return res;
    }

    async create(data) {
      const res = await models.Documentacion.create(data);
      return res;
    }

    async createWithFile(body, file) {
      const data = this.buildDataWithFile(body, file);
      return this.create(data);
    }

    async update(id, data) {
      const model = await this.findOne(id);
      const res = await model.update(data);
      return res;
    }

    async updateWithFile(id, body, file) {
      const model = await this.findOne(id);
      if (!model) {
        throw new Error('Documentación no encontrada');
      }

      const data = this.buildDataWithFile(body, file, model.archivo_url_documentacion);
      const res = await model.update(data);
      return res;
    }

    async delete(id) {
      const model = await this.findOne(id);
      await model.destroy();
      return { deleted: true };
    }
  
  }

  module.exports = DocumentacionService;  //---- module.exports = exporta la Clase de Servicio 
//------------permite que se pueda acceder caso contrario estar[ia encapsulada y no tendr[ia acceso