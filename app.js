const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const characterRoutes = require('./routes/characters');

const app = express();


// MongoDB connection string
const url = 'mongodb://storm:fullzap1@ds153096.mlab.com:53096/mindstorm'

mongoose.connect (url)
    .then(() => {
        console.log('Database connection established!');
    })
    .catch(() => {
        console.log('Error! No database connection!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS - Cross-Origin Resource Sharing. This helps to expose the api to the client.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Request-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
});

// app.use('/api/characters', (req, res, next) => {
//     const characters = [
//         { id: 'wkekaakd', title: 'Name', detail: 'Jorg' },
//         { id: 'wkefaj', title: 'Age', detail: '101 earth years' }
//     ];
//     res.status(200).json({
//         message: 'Characters fetched!',
//         characters: characters
//     });
// });

app.use('api/characters', characterRoutes);

module.exports = app;