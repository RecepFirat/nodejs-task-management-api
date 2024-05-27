const Task = require('../entities/task');
const createTask = async (title, description, userId) => {
  const task = new Task({ title, description, user: userId });
  await task.save();
  return task;
};

const getTasks = async (userId) => {
  return Task.find({ user: userId });
};

const getTaskById = async (taskId, userId) => {
  return Task.findOne({ _id: taskId, user: userId });
};

const updateTask = async (taskId, userId, updateData) => {
  return Task.findOneAndUpdate({ _id: taskId, user: userId }, updateData, { new: true, runValidators: true });
};

const deleteTask = async (taskId, userId) => {
  return Task.findOneAndDelete({ _id: taskId, user: userId });
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
