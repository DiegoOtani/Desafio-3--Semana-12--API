import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Trisog Travels API',
      version: '1.0.0',
      description: 'This is the API for managing tours, categories, and reviews. It provides endpoints for user authentication, tour management, and retrieving information about destinations and activities.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/controllers/*.ts', './src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;