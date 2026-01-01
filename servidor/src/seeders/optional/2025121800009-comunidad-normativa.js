'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({ tableName: 'normativa', schema: 'fcc_historiaclinica' }, [
      {
        id_normativa: 1,
        tipo_permiso: 'Constitución',
        nmro_resolucion_registro: 'LEY-COMP-2024-001',
        entidad_reguladora: 'Superintendencia de Compañías',
        estado_cumplimiento: true,
        categoria_riesgo: 'Bajo',
        archivo_digital_url: 'https://bit.ly/ley-comp-ec',
        id_tipo_normativa: 1 // Ley Orgánica
      },
      {
        id_normativa: 2,
        tipo_permiso: 'Operación',
        nmro_resolucion_registro: 'SCVS-INC-2024-050',
        entidad_reguladora: 'Registro Mercantil',
        estado_cumplimiento: true,
        categoria_riesgo: 'Medio',
        archivo_digital_url: 'https://bit.ly/reg-merc-ec',
        id_tipo_normativa: 3 // Resolución
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: 'normativa', schema: 'fcc_historiaclinica' }, null, {});
  }
};