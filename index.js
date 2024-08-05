const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:8080', // Substitua pela URL do seu frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/routes.js'));

io.on('connection', (socket) => {

  socket.on('SendMessage', async (id) => {
    try{
      const response = await axios.post('http://localhost:5050/api/auth/ReturnMessage', {
        ID: id,
      })
      io.emit('message', response.data);
    }
    catch(e) {
      console.log(e);
    }
  })

  socket.on('disconnect', () => {

  });

})


// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});