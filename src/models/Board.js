module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('board', {
    idx: {
      field: 'idx',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      field: 'title',
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      field: 'content',
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
    }
  }, {
    tableName: 'board',
    timestamps: false,
  });

  Board.deleteBoard = (idx) => Board.destroy({
    where: {
      idx,
    }
  })

  return Board;
}