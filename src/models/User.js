module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      field: 'id',
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    pw: {
      field: 'pw',
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      field: 'name',
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: { //학번
      field: 'number',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    score: {
      field: 'score',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    salt: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'user',
    timestamps: false,
  });

  return User;
}