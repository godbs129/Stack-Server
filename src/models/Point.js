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

  Point.getMyPoint = (userId) => sequelize.query(`
    SELECT type, score, reason, created_at
    FROM point
    WHERE userId = '${userId}';
  `, {
    type: sequelize.QueryTypes.SELECT,
    raw: true,
  });

  Point.getMyPointByType = (userId, type) => sequelize.query(`
  SELECT type, score, reason, created_at
  FROM point
  WHERE userId = '${userId}' and type = '${type}';
  `, {
    type: sequelize.QueryTypes.SELECT,
    raw: true,
  });

  Point.getUserRankingByType = (type) => sequelize.query(`
  SELECT b.name, a.point
  FROM point AS a
  JOIN \`user\` AS b ON userId = b.id
  WHERE a.type = '${type}'
  ORDER BY point DESC;
  `, {
    type: sequelize.QueryTypes.SELECT,
    raw: true,
  });

  return Point;
}