import dotenv from 'dotenv'

dotenv.config({})

import express from 'express';
import cors from 'cors'
import { Connection } from './database/db.connection.js';
import userRouter from './src/modules/user/user.routes.js'
import ToDoRouter from './src/modules/toDo/toDo.routes.js'
import { auth } from './src/middlewares/auth.js';
const port = 3000;
const app = express();
Connection()
app.use(express.json())
app.use(cors())


app.get('/', (req,res) => {
    res.send("hello")
})

app.use('/api/v1/auth' , userRouter)
app.use('/api/v1' , auth,ToDoRouter)

app.listen(port, () => {
    console.log("Server Working");
})
