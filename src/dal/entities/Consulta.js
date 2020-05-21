module.exports = (sequelize, DataType) => {
    // NOMBRE TABLA, Y SUS FILAS
    const Consulta = sequelize.define('Consultas', {
        id: {
            type: DataType.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        comentario: {
            type: DataType.TEXT,
            allowNull: true
        },
        diagnostico: {
            type: DataType.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        fecha: {
            type: DataType.DATE,
            allowNull: false,
            validate: {
                isDate: true
            },
            defaultValue: new Date() 
        }
    });

    // Relacion uno a muchos
    Consulta.associate = (models) => {
        Consulta.belongsTo(models.Pacientes);
        Consulta.belongsToMany(models.Sintomas,{through: 'SintomasPaciente'});
        //Consulta.belongsToMany(models.AntecedentesEpidemiologicos);
        Consulta.belongsTo(models.Casos);CHECK
    };

    return Consulta;

};
