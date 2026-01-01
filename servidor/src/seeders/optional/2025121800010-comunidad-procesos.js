'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({ tableName: 'procesos', schema: 'fcc_historiaclinica' }, [
      {
        id_proceso: 1,
        nombre_proceso: 'Inscripción de Compañía Anónima',
        entregable: 'Nombramiento y Escritura Inscrita',
        descripcion_proceso: 'Proceso legal para formalizar una S.A. en Ecuador.',
        id_tipo_proceso: 1,
        id_normativa: 1
      },
      {
        id_proceso: 2,
        nombre_proceso: 'Aumento de Capital',
        entregable: 'Escritura Pública',
        descripcion_proceso: 'Modificación del estatuto social por nuevos aportes.',
        id_tipo_proceso: 1,
        id_normativa: 2
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: 'procesos', schema: 'fcc_historiaclinica' }, null, {});
  }
};