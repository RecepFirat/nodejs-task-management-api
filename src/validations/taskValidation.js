const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()
});

const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional()
});

const taskIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema
};
