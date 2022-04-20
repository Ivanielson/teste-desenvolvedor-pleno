const question = require('express').Router();
const questionsController = require('../controllers/QuestionController');

question.get('/:id', questionsController.getById);
question.delete('/:id', questionsController.deleteById);
question.put('/:id', questionsController.update);
question.post('/', questionsController.create);
question.get('/', questionsController.getAll);

module.exports = question;