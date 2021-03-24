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
    salt: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'user',
    timestamps: false,
  });

  User.getUserNameAndNumber = (userId) => sequelize.query(`
  SELECT name, number
  FROM User
  WHERE id = '${userId}';
  `, {
    type: sequelize.QueryTypes.SELECT,
    raw: true,
  })

  return User;
}