const express = require('express');
const app = express();

app.use(express.json());
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:8080',
  'http://frontend',   
  'http://frontend:8080',
  'http://taskflow_network:8080'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); 
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'El origen CORS no está permitido.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/auth', require('./routes/user.routes'));
app.use('/task', require('./routes/task.routes'));

app.use('/', (req, res) => {
    res.send('API de Pedidos funcionando')
    });

module.exports = app;
