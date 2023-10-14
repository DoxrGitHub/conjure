const express = require('express');
const path = require('path');
const { getUserInfo } = require('@replit/repl-auth');
const app = express();

app.use(express.static(path.join(__dirname, './online')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/online/index.html'));
});

app.get('/:game', (req, res) => {
  res.sendFile(path.join(__dirname, '/'+ req.params.game + '/index.html'));
});

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '/online/404.html'), 404);
}); app.listen(42069, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Conjure started. Listening on 0.0.0.0:3000 to bbno$')
});