const existingEmails = [
    "hankural@gmail.com",
    "hankural1@gmail.com",
    "hankural12@gmail.com",
    "hankural123@gmail.com",
    "hankural121212@gmail.com",
    "test@example.com",
    "test987@example.com",
    "test1231231@example.com",
    "te1123123st@example.com",
    "hankural1@example.com",
    "hankural1111@example.com",
    "hankural111112312312312321@example.com"
];
const generateRandomEmail = () => {
    let randomEmail;
    do {
        randomEmail = `testuser_${Math.random().toString(36).substring(2, 15)}@example.com`;
    } while (existingEmails.includes(randomEmail));
    return randomEmail;
};
const generateRandomPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
};
module.exports = {
    generateRandomPassword,
    generateRandomEmail
}