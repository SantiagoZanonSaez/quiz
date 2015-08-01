var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
//Autoload de comandos con :quizId. Permite controlar en caso de que la url introduzca un quizId no existente
router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes?search', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/*router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);*/

router.get('/author', function(req, res) {
  res.render('author', { title: 'Autor' });
});
router.get('/search', function(req, res) {
  res.render('search', { title: 'Búsqueda' });
});

module.exports = router;
