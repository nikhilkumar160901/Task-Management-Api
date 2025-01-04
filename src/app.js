const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();
const server = http.createServer(app);
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const io = socketIo(server, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});


const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'Task Management API',
          version: '1.0.0',
          description: 'API for Task Management',
      },
      servers: [
          {
              url: 'http://localhost:4003',
          },
      ],
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get("/", (req, res) => {
  res.send("Welcome to the Task Management API!");
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/task-analytics', analyticsRoutes);
app.use('/api/teams', teamRoutes);


io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
  });
});

module.exports = app;
