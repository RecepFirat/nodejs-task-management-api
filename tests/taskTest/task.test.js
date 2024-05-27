const request = require("supertest");
const app = require("../../src/index");

const authenticateUser = async () => {
    const response = await request(app).post('/api/auth/login').send({
        email: 'recepfir@gmail.com',
        password: '1231231231'
    });
    return response.body.token;
};

describe('Task Endpoints', () => {
    let token;
    beforeAll(async () => {
        token = await authenticateUser();
    });
    it('should create a new task with valid data', async () => {
        jest.setTimeout(10 * 1000);
        const response = await request(app)
            .post('/api/task')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Title1', description: 'Description1' });
        expect(response.status).toBe(201);
    });
    it('should not create a task without authentication', async () => {
        jest.setTimeout(10 * 1000);
        const response = await request(app)
            .post('/api/task')
            .send({ title: 'New Task', description: 'Task Description' });
        expect(response.status).toBe(401);
    });
    it('should get all tasks with authentication', async () => {
        jest.setTimeout(10 * 1000);
        const response = await request(app)
            .get('/api/task')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    it('should get a specific task by id with authentication', async () => {
        jest.setTimeout(10 * 1000);
        const taskId = '6654351b543ca926c3960598';
        const response = await request(app)
            .get(`/api/task/${taskId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('description');
    });
    it('should update a task with valid data and authentication', async () => {
        jest.setTimeout(10 * 1000);
        const taskId = '6654351b543ca926c3960598';
        const response = await request(app)
            .put(`/api/task/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Task', description: 'Updated Description' });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Task');
        expect(response.body.description).toBe('Updated Description');
    });

    it('should delete a task with valid id and authentication', async () => {
        jest.setTimeout(10 * 1000);
        const taskId = '6654351b543ca926c3960598';
        const response = await request(app)
            .delete(`/api/task/${taskId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Task deleted');
    });
});
