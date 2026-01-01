'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      { tableName: 'documentacion', schema: 'fcc_historiaclinica' },
      [
        {
          id_documentacion: 1,
          codigo_documentacion: 'DOC-FCC-001',
          nombre_documentacion: 'Cédula de Identidad',
          descripcion_documentacion: 'Documento de identificación personal del beneficiario',
          fecha_emision_documentacion: new Date('2021-05-10'),
          fecha_recepcion_documentacion: new Date('2024-01-15'),
          estado_documentacion: 'Vigente',
          archivo_url_documentacion: 'https://bit.ly/cedula-beneficiario-001',
          observaciones_documentacion: 'Documento legible y actualizado',
          id_tipo_documentacion: 1 // Identificación
        },
        {
          id_documentacion: 2,
          codigo_documentacion: 'DOC-FCC-002',
          nombre_documentacion: 'Certificado Médico',
          descripcion_documentacion: 'Certificado médico emitido por centro de salud',
          fecha_emision_documentacion: new Date('2024-02-01'),
          fecha_recepcion_documentacion: new Date('2024-02-03'),
          estado_documentacion: 'Vigente',
          archivo_url_documentacion: 'https://bit.ly/certificado-medico-002',
          observaciones_documentacion: 'Emitido por MSP',
          id_tipo_documentacion: 2 // Médico
        },
        {
          id_documentacion: 3,
          codigo_documentacion: 'DOC-FCC-003',
          nombre_documentacion: 'Informe Social',
          descripcion_documentacion: 'Informe de situación socioeconómica del paciente',
          fecha_emision_documentacion: new Date('2024-03-12'),
          fecha_recepcion_documentacion: new Date('2024-03-14'),
          estado_documentacion: 'En revisión',
          archivo_url_documentacion: 'https://bit.ly/informe-social-003',
          observaciones_documentacion: 'Pendiente validación por trabajo social',
          id_tipo_documentacion: 3 // Social
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      { tableName: 'documentacion', schema: 'fcc_historiaclinica' },
      null,
      {}
    );
  }
};
