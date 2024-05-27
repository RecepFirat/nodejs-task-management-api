const User = require('../entities/user');
const getAllUsers = async () => {
    try {
        const users = await User.find({}, 'email');
        const emails = users.map(user => user.email);
        return emails;
    } catch (error) {
        console.error('Error fetching user emails:', error);
        throw error;
    }
};

const getUsersWithEmails = async () => {
    try {
        const users = await getAllUsers();
        if (users.length > 1) {
            return users;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching users with emails:', error);
        throw error;
    }
};

module.exports = {
    getAllUsers,
    getUsersWithEmails
};
