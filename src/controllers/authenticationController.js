const {registerUser, loginUser} = require('../services/authenticationService');
const register = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const token = await registerUser(email, password);
        return res.status(201).json({token});
    } catch (err) {
        next(err);
    }
};
const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const token = await loginUser(email, password);
        if (!token) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        return res.status(200).json({token});
    } catch (err) {
        next(err);
    }
};
module.exports = {
    register,
    login
};
