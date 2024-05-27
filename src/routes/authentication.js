const express = require('express');
const { register, login } = require('../controllers/authenticationController');
const { validateBody } = require('../middlewares/validationHandler');
const { registerSchema, loginSchema } = require('../validations/authenticationValidation');

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);

module.exports = router;
