const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'views')));

app.use('/', routes);

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'memberRegistration.html'));
});

app.get('/reservation', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reservation.html'));
});

if (require.main === module) {
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  module.exports = server;
} else {
  module.exports = app;
}