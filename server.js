const express = require('express');
const path = require('path');

const PORT = 5000;

const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('dist'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

// listen for requests :)
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
