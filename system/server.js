const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
app.use(cors());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
let products = [];

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server, path: '/ws/products' });

wss.on('connection', ws => {
  console.log('Client connected');

  // Send current products on connection
  ws.send(JSON.stringify({ type: 'productsUpdate', products }));

  // Listen for updates
  ws.on('message', message => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'productsUpdate') {
        products = data.products;
        // Broadcast to all clients
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'productsUpdate', products }));
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});