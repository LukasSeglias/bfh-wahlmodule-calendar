'use strict';

const extractor = require('./extractor');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/wahlmodule', function (req, res) {

    extractor.extract()
        .then((result) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'public, max-age=300')
            res.end(JSON.stringify(result));
        });
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});
