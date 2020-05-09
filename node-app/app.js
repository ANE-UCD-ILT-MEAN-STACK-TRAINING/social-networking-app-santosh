var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();

const postRoutes = require('./routes/posts');

mongoose.connect('mongodb://localhost:27017/MyPosts?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false');

mongoose.connection.on('error', (err) => {
    if(err){
        console.log('Error occured'); 
    }
});

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo DB');
});

const port = 3000;

app.use(cors());

app.use(bodyparser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/posts', postRoutes);

app.listen(port, () => {
    console.log('Server started at port: ' + port);
})
