const userService = require('../services/userService');

const getAllUserEmails = async (req, res, next) => {
    try {
        const emails = await userService.getUsersWithEmails();
        res.status(200).json(emails);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUserEmails
};
