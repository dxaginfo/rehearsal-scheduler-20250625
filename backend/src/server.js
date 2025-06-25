const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bandRoutes = require('./routes/band.routes');
const rehearsalRoutes = require('./routes/rehearsal.routes');
const setlistRoutes = require('./routes/setlist.routes');
const resourceRoutes = require('./routes/resource.routes');
const errorHandler = require('./middleware/errorHandler');
const { authenticateJwt } = require('./middleware/auth');

// Initialize Express app
const app = express();
const prisma = new PrismaClient();

// Set up middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Make Prisma available to request handlers
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Swagger documentation options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rehearsal Scheduler API',
      version: '1.0.0',
      description: 'API documentation for the Rehearsal Scheduler application',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:4000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/users', authenticateJwt, userRoutes);
app.use('/api/bands', authenticateJwt, bandRoutes);
app.use('/api/rehearsals', authenticateJwt, rehearsalRoutes);
app.use('/api/setlists', authenticateJwt, setlistRoutes);
app.use('/api/resources', authenticateJwt, resourceRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

module.exports = app;