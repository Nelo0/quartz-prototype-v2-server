"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.post('/api-demo', (req, res) => {
    const { destination } = req.body;
    if (!destination) {
        res.status(400).send({ message: "destination is required" });
    }
    (0, server_1.sendNotification)(destination);
    res.send({
        status: 'success'
    });
});
app.listen(PORT, () => console.log(`[server] Server is runnning at http://localhost:${PORT}`));
