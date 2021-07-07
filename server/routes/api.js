const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

//define mongo url string and database
const mongourl = 'mongodb://localhost:27017';
const dbName = 'UserModule';

// Connect
const connection = (closure) => {
    return MongoClient.connect(mongourl,{ useNewUrlParser: true }, (err, client) => {
        if (err) return console.log('Connection request to mongo failed',err);
        else{
        console.log('Mongodb connection successful!!');
        let db = client.db(dbName);
        closure(db);
    }
    });
};
// Response handling
const response = {};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = 'Internal server error, looks like I screwed up somewhere!!' ;
    res.status(501).json(response);
};


// Get users
router.get('/welcome', (req, res) => {

    // sportname=req.params.sportname;
    // connection((db) => {
    //     db.collection('sports_new')
    //         .find({"name":sportname})
    //         .toArray()
    //         .then((sports) => {
    //             res.status(200).json(sports);
    //         })
    //         .catch((err) => {
    //             sendError(err, res);
    //         });
    // });
    res.end('Welcome to user module server!');
});
module.exports = router;
