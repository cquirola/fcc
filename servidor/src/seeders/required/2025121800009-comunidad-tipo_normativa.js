'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({ tableName: 'tipo_normativa', schema: 'fcc_historiaclinica' }, [
      { id_tipo_normativa: 1, nombre_tipo_normativa: 'Ley Orgánica', descripcion_tipo_normativa: 'Leyes de jerarquía superior en el ordenamiento jurídico ecuatoriano.' },
      { id_tipo_normativa: 2, nombre_tipo_normativa: 'Reglamento', descripcion_tipo_normativa: 'Normas para la aplicación de leyes mercantiles.' },
      { id_tipo_normativa: 3, nombre_tipo_normativa: 'Resolución', descripcion_tipo_normativa: 'Actos administrativos de la Superintendencia de Compañías.' }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: 'tipo_normativa', schema: 'fcc_historiaclinica' }, null, {});
  }
};