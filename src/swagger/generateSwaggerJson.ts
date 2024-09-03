import fs from 'fs';
import swaggerSpec from '../config/swaggerConfig';

fs.writeFileSync('src/swagger/swagger-output.json', JSON.stringify(swaggerSpec, null, 2));

console.log('Swagger file generated: swagger-output.json');