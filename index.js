const express = require('express');
const path = require('path');
const { getUserInfo } = require('@replit/repl-auth');
const app = express();
const axios = require('axios');

app.use(express.static(path.join(__dirname, './online')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/online/index.html'));
});

app.get('/userBlock', (req, res) => {
  res.sendFile(path.join(__dirname, '/online/user.html'));
});

app.get('/p/:url', async (req, res) => {
  try {
    const packageUrl = Buffer.from(req.params.url, 'base64').toString('utf-8');
    const response = await axios.get(packageUrl, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'] || 'application/octet-stream';

    res.set('Content-Type', contentType);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error proxying the package. Sorry.');
  }
});

app.get('/gp/:owner/:repo/:path(*)', async (req, res) => {
  try {
    const { owner, repo, path } = req.params;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'] || 'application/octet-stream';

    res.set('Content-Type', contentType);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error proxying the GitHub file. Sorry.');
  }
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