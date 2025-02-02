import express from 'express';
import { findOneUserController, listUsersController, createUserController, deleteUserController } from './controllers/user.controller';
import { createTodoController } from './controllers/todo.controller';

const app = express();
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/users', listUsersController);
app.get('/users/:userId', findOneUserController)
app.post('/users', createUserController);
app.post('/task', createTodoController);
app.delete('/users/:userId', deleteUserController);
app.listen(port, () => {
    console.log("Server running on", port);
})