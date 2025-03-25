
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/list', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(require(path.join(__dirname, '/list.json')));
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})