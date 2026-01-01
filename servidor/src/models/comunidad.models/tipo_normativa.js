const { Model, DataTypes } = require('sequelize');
class Tipo_normativa extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'tipo_normativa',  //---- tabla en la bdd
            modelName: 'Tiponormativa',//---- nobmre del Modelo en el codigo
            schema: 'fcc_historiaclinica', //---eesquem en la base de datos
            timestamps: false, // no incluir fecha creacion y actualizacion
        };
    }

    static associate(models) {  //----relacion Provincia y Canton
        Tipo_normativa.hasOne(models.Normativa, {  //---- 1 Canton pertenece a 1 Provincia / 1 Provincia n Cantones
            foreignKey: 'id_tipo_normativa',
            as: 'tipo_normativa_normativa',
        });
    }

}

//------------
const Tipo_normativaSchema = {
    id_tipo_normativa:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    nombre_tipo_normativa: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    descripcion_tipo_normativa: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    
}

module.exports = {Tipo_normativa, Tipo_normativaSchema}; 