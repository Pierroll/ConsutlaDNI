const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/config', (req, res) => {
  res.json(config);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
