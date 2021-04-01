module.exports = (sequelize, DataTypes) => {
  const Point = sequelize.define('point', {
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
    point: {
      field: 'point',
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
        onDelete: 'CASCADE',
      }
    },
    giverId: {
      field: 'giver_id',
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
        onDelete: 'SET NULL'
      }
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }, {
    tableName: 'point',
    timestamps: false,
  });

  Point.getMyScore = (userId) => sequelize.query(`
    SELECT type, score, reason, created_at
    FROM Score
    WHERE userId = '${userId}';
  `, {
    type: sequelize.QueryTypes.SELECT,
    raw: true,
  });

  Point.getMyScoreByType = (userId, type) => sequelize.query(`
  SELECT type, score, reason, created_at
  FROM Score
  WHERE userId = '${userId}' and type = '${type}';
  `, {
    type: sequelize.QueryTypes.SELECT,
    raw: true,
  });

  Point.getUserRankingByType = (type) => sequelize.query(`
  SELECT b.name, a.score
  FROM Score AS a
  JOIN \`user\` AS b ON userId = b.id
  WHERE a.type = '${type}'
  ORDER BY score DESC;
  `, {
    type: sequelize.QueryTypes.SELECT,
    raw: true,
  });

  return Point;
}