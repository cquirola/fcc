const { models } = require('../../libs/sequelize');

class TipoDocumentacionService { 
  
    constructor() {}

    async find() {
      const res = await models.Tipodocumentacion.findAll();   //--- nombre del models = models.Provincia
      return res;
    }

    async findOne(id) {
      const res = await models.Tipodocumentacion.findByPk(id);
      return res;
    }

    async create(data) {
      const res = await models.Tipodocumentacion.create(data);
      return res;
    }

    async update(id, data) {
      const model = await this.findOne(id);
      const res = await model.update(data);
      return res;
    }

    async delete(id) {
      const model = await this.findOne(id);
      await model.destroy();
      return { deleted: true };
    }
  
  }

  module.exports = TipoDocumentacionService;  //---- module.exports = exporta la Clase de Servicio 
//------------permite que se pueda acceder caso contrario estar[ia encapsulada y no tendr[ia acceso