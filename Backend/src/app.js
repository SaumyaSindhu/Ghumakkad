import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());

/* Health check */
app.get("/", (req, res) => {
    res.send("Welcome to Ghumakkad API!!")
})

export default app;