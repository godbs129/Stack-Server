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
    number: { // 학번
      field: 'number',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bonusPoint: { // 상점
      field: 'bonus_point',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    minusPoint: { // 벌점
      field: 'minus_point',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    type: { // 계정 유형(0: 학생, 1: 관리자(교사))
      field: 'type',
      type: DataTypes.INTEGER,
      allowNull: false,
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
  });

  User.getUserRankBonusPoint = () => sequelize.query(`
  SELECT name, bonus_point
  FROM User
  ORDER BY bonus_point DESC;
  `, {
    type: sequelize.QueryTypes.SELECT,
    raw: true,
  });

  User.getUserRankMinusPoint = () => sequelize.query(`
  SELECT name, bonus_point
  FROM User
  ORDER BY bonus_point DESC;
  `, {
    type: sequelize.QueryTypes.SELECT,
    raw: true,
  });

  User.updateUserBonusPoint = (userId, point) => sequelize.query(`
  UPDATE user
  SET bonus_point = bonus_point + ${point}
  WHERE id = '${userId}'
  `, {
    type: sequelize.QueryTypes.UPDATE,
    raw: true,
  });

  return User;
}