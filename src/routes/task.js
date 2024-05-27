const express = require('express');
const {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController
} = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authenticationHandler');
const { validateBody, validateParams } = require('../middlewares/validationHandler');
const { createTaskSchema, updateTaskSchema, taskIdSchema } = require('../validations/taskValidation');

const router = express.Router();

router.post('/', authMiddleware, validateBody(createTaskSchema), createTaskController);
router.get('/', authMiddleware, getTasksController);
router.get('/:id', authMiddleware, validateParams(taskIdSchema), getTaskByIdController);
router.put('/:id', authMiddleware, validateParams(taskIdSchema), validateBody(updateTaskSchema), updateTaskController);
router.delete('/:id', authMiddleware, validateParams(taskIdSchema), deleteTaskController);

module.exports = router;
