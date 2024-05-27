const request = require("supertest");
const app = require("../../src/index");
const  {generateRandomEmail,generateRandomPassword} = require("./generator");

describe('Authentication Endpoints', () => {
    it('should register a new user with valid email and password', async () => {
        jest.setTimeout(10 * 1000);
        const email = generateRandomEmail();
        const password = generateRandomPassword();
        const response = await request(app).post('/api/auth/register').send({
            email: email,
            password: password
        });
        expect(response.status).toBe(201);
    });

    it('should not register a user with invalid email', async () => {
        jest.setTimeout(10 * 1000);
        const password = generateRandomPassword();
        const response = await request(app).post('/api/auth/register').send({
            email: 'invalidemail', // Invalid email format
            password: password
        });
        expect(response.status).toBe(400);
    });

    it('should not register a user with invalid password length', async () => {
        jest.setTimeout(10 * 1000);
        const email = generateRandomEmail();
        const password = 'short'; // Does not meet minimum character requirement
        const response = await request(app).post('/api/auth/register').send({
            email: email,
            password: password
        });
        expect(response.status).toBe(400);
    });

    it('should not register a user with duplicate email', async () => {
        jest.setTimeout(10 * 1000);
        const email = generateRandomEmail();
        const password = generateRandomPassword();
        await request(app).post('/api/auth/register').send({
            email: email,
            password: password
        });
        const response = await request(app).post('/api/auth/register').send({
            email: email, // Same email as previous test
            password: password
        });
        expect(response.status).toBe(400);
    });

    it('should not login with invalid credentials', async () => {
        jest.setTimeout(10 * 1000);
        const email = generateRandomEmail();
        const response = await request(app).post('/api/auth/login').send({
            email: "hankural@gmail.com",
            password: 'wrongpassword'
        });
        expect(response.status).toBe(400);
    });
});
