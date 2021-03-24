module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('score', {
    idx: {
      field: 'idx',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      field: 'type',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      field: 'score',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      field: 'reason',
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      field: 'userId',
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
        onDelete: 'cascade',
      }
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }, {
    tableName: 'score',
    timestamps: false,
  });

  Score.getMyScore = (userId) => sequelize.query(`
    SELECT type, score, reason, created_at
    FROM Score
    WHERE userId = '${userId}';
  `, {
    type: sequelize.QueryTypes.SELECT,
    raw: true,
  });

  Score.getMyScoreByType = (userId, type) => sequelize.query(`
  SELECT type, score, reason, created_at
  FROM Score
  WHERE userId = '${userId}' and type = '${type}';
  `, {
    type: sequelize.QueryTypes.SELECT,
    raw: true,
  })

  return Score;
}