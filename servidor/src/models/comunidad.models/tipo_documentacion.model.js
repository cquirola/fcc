const { Model, DataTypes } = require('sequelize');
class TipoDocumentacion extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'tipo_documentacion',
            modelName: 'Tipodocumentacion',
            schema: 'fcc_historiaclinica',
            timestamps: false, // no incluir fecha creacion y actualizacion
        };
    }

    static associate(models) {
        TipoDocumentacion.hasOne(models.Documentacion, { //----1 Provincia n cantones
            foreignKey: 'id_tipo_documentacion',
            as: 'tipo_documentacion_documentacion', //relacion 
        });
    }

}

//------------
const TipoDocumentacionSchema = {
    id_tipo_documentacion:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    nombre_tipo_documentacion: {
        type: DataTypes.STRING(120),
        allowNull: true,
    },
    
}

module.exports = {TipoDocumentacion, TipoDocumentacionSchema};