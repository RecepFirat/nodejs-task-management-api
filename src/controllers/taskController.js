const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../services/taskService');

const createTaskController = async (req, res, next) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const task = await createTask(title, description, userId);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getTasksController = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const tasks = await getTasks(userId);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskByIdController = async (req, res, next) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const task = await getTaskById(taskId, userId);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const updateTaskController = async (req, res, next) => {
  const userId = req.user.id;
  const taskId = req.params.id;
  const updateData = req.body;

  try {
    const task = await updateTask(taskId, userId, updateData);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTaskController = async (req, res, next) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const task = await deleteTask(taskId, userId);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController
};
