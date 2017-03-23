'use strict';

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('client'));
app.all('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('Front-end server is now listening on port', listener.address().port);
});
