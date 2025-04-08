const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('¡auth-service está funcionando!');
});

app.listen(port, () => {
  console.log(`auth-service escuchando en http://localhost:${port}`);
});