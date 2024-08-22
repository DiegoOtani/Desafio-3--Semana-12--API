import express from 'express';
import typeRouter from '../routes/typeRoutes';
import countryRouter from '../routes/countryRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/type', typeRouter);
app.use('/api/country', countryRouter);

export default app;