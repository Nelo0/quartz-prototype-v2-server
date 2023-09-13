import { sendNotification } from './server';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post('/api-demo', (req: Request, res: Response) => {
    const { destination } = req.body;

    if (!destination) {
        res.status(400).send({message: "destination is required"});
    }

    sendNotification(destination);
    res.send({
        status: 'success'
    })
});

app.listen(
    PORT,
    () => console.log(`[server] Server is runnning on port ${PORT}`)
);
