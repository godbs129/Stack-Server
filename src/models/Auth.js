module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define('auth', {
    token: {
      field: 'token',
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      field: 'user_id',
      type: DataTypes.STRING,
      allowNull: false,
    },
    ttl: {
      field: 'ttl',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'auth',
    timestamps: false,
  });

  return Auth;
}