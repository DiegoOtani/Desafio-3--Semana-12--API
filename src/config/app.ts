import express from 'express';
import typeRouter from '../routes/typeRoutes';
import countryRouter from '../routes/countryRoutes';
import destinationRouter from '../routes/destinationRoutes';
import tourRouter from '../routes/tourRoutes';
import reviewRouter from '../routes/reviewRoutes';
import cors from 'cors';
import swaggerSpec from './swaggerConfig';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/types', typeRouter);
app.use('/api/country', countryRouter);
app.use('/api/destinations', destinationRouter);
app.use('/api/tours', tourRouter);
app.use('/api/reviews', reviewRouter);

export default app;