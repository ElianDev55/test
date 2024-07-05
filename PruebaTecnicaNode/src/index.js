import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import developerRouter from './routes/developers.routes.js';
import platformRouter from './routes/platforms.routes.js';
import videogameRouter from './routes/videogame.routes.js';

const app = express();


app.use(cors());
app.use(express.json());
app.use(developerRouter);
app.use(platformRouter);
app.use(videogameRouter);

app.listen(PORT, () => {
    console.log('Server is running on port', PORT  || 3000);
});
