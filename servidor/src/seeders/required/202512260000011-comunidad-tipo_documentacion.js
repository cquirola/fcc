'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      { tableName: 'tipo_documentacion', schema: 'fcc_historiaclinica' },
      [
        {
          id_tipo_documentacion: 1,
          nombre_tipo_documentacion: 'Identificación'
        },
        {
          id_tipo_documentacion: 2,
          nombre_tipo_documentacion: 'Médico'
        },
        {
          id_tipo_documentacion: 3,
          nombre_tipo_documentacion: 'Social'
        },
        {
          id_tipo_documentacion: 4,
          nombre_tipo_documentacion: 'Legal'
        },
        {
          id_tipo_documentacion: 5,
          nombre_tipo_documentacion: 'Administrativo'
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      { tableName: 'tipo_documentacion', schema: 'fcc_historiaclinica' },
      null,
      {}
    );
  }
};
