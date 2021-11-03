const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false
    },
    launchDate:{
      type: DataTypes.STRING,
      allowNull: true
    },
    rating:{
      type: DataTypes.FLOAT
    },
    backgroundImage:{
      type: DataTypes.STRING,
      allowNull: true
    }

  },{
    freezeTableName: true,
    timestamps: false
  });
};
