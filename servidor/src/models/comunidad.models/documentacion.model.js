const { Model, DataTypes } = require('sequelize');
class Documentacion extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'documentacion',
            modelName: 'Documentacion',
            schema: 'fcc_historiaclinica',
            timestamps: false, // no incluir fecha creacion y actualizacion
        };
    }

    static associate(models) {
        Documentacion.belongsTo(models.TipoDocumentacion, { //----1 Provincia n cantones
            foreignKey: 'id_tipo_documentacion',
            as: 'tipo_documentacion_documentacion', //relacion 
        });
        Documentacion.hasOne(models.Interaccion, { //----1 Provincia n cantones
            foreignKey: 'id_documentacion',
            as: 'documentacion_interaccion', //relacion 
        });
    }

}

//------------
const DocumentacionSchema = {
    id_documentacion:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    codigo_documentacion: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    nombre_documentacion: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    descripcion_documentacion: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    fecha_emision_documentacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fecha_recepcion_documentacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    estado_documentacion: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    archivo_url_documentacion: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    observaciones_documentacion: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },

    
}

module.exports = {Documentacion, DocumentacionSchema};