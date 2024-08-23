import express from 'express';
import typeRouter from '../routes/typeRoutes';
import countryRouter from '../routes/countryRoutes';
import destinationRouter from '../routes/destinationRoutes';
import tourRouter from '../routes/tourRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/type', typeRouter);
app.use('/api/country', countryRouter);
app.use('/api/destination', destinationRouter);
app.use('/api/tour', tourRouter);

export default app;