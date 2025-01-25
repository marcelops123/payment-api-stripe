import express from 'express';
import { addUserController, listUsersController } from './controllers/user.controller';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/users', listUsersController);
app.get('/useradd', addUserController)
app.listen(port, () => {
    console.log("Server running on", port);
})