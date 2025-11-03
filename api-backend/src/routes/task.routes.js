const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');
const {authMiddleware} = require('../middlewares/auth.middleware');

router.use(authMiddleware); // todas requieren login

router.post('/', TaskController.createTask);

router.get('/', TaskController.getAllTasks);



router.put('/:id', TaskController.updateTask);

router.delete('/:id', TaskController.deleteTask);

module.exports = router;
