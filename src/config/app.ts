import express from 'express';
import typeRouter from '../routes/typeRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/type', typeRouter);

export default app;