const { Answers, Questions } = require('../models');

const create = async ({ answer, questionId }) => {
  try {
    const newAnswer = await Answers.create({ answer, questionId });
    return newAnswer;
  } catch (error) {
    console.error(error);
  }
};

const getAll = async () => {
  try {
    const answers = await Questions.findAll({
      include: [{
        model: Answers,
        as: 'Answer',
        attributes: ['answer','questionId'],
      }],
    });
    return answers;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create,
  getAll,
};