// Packages
import express from "express";
import * as devenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

devenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.get('/', async (req, res) => {
    res.send('Hello from DALL_E!')
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log("Server has started at port 8080"))
    } catch (error) {
        console.log(error)
    }
}

startServer();


