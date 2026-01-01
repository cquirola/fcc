'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({ tableName: 'tipo_proceso', schema: 'fcc_historiaclinica' }, [
      { id_tipo_proceso: 1, nombre_tipo_proceso: 'Societario', descripcion_tipo_proceso: 'Relacionado con la vida jurídica de las compañías.' },
      { id_tipo_proceso: 2, nombre_tipo_proceso: 'Registro Mercantil', descripcion_tipo_proceso: 'Inscripción de actos y contratos de comercio.' }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: 'tipo_proceso', schema: 'fcc_historiaclinica' }, null, {});
  }
};