'use strict';

const express = require('express');
const path = require('path');

const bookRouter = require('./api/book.js');
const loanRouter = require('./api/loan.js');
const patronRouter = require('./api/patron.js');

const app = express();

// API's
app.use('/api/books', bookRouter);
app.use('/api/loans', loanRouter);
app.use('/api/patrons', patronRouter);

app.use(express.static('client'));
app.all('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('Front-end server is now listening on port', listener.address().port);
});
