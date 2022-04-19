module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false,
    tableName: 'Questions'
  });

  Question.associate = (models) => {
    Question.hasmany(models.Answers, {
      foreignKey: 'id', as: 'Answer',
    });
  };

  return Question;
}