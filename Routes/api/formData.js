const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;

const myUrl = process.env.DB_URL || 'mongodb://localhost:27017/students';

let studentCollection;

MongoClient.connect(myUrl, function (err, client) {
    if (err) return console.log('error');

    let db = client.db('students');
    studentCollection = db.collection('studentForm');
});

router.get('/', function (req, res) {

    studentCollection.find({}).toArray(function (err, result) {
        res.json(result);
    });
});


router.get('/:id', function (req, res) {

    studentCollection.find({ _id: ObjectId(req.params.id) }).toArray(function (err, result) {
        res.json(result);
    });
});

router.post('/', function (req, res) {
    const newMember = {

        name: req.body.name,
        faculty: req.body.faculty,
        email: req.body.email
    };
    if (!newMember.name || !newMember.faculty || !newMember.email) {
        return res.status(400).json({ msg: 'please include name and email and faculty' });
    }
    studentCollection.insert(newMember, function (err, result) {
        res.send(result);
    });
});

router.put('/:id', function (req, res) {
    let updateData = {
        name: req.body.name,
        faculty: req.body.faculty,
        email: req.body.email
    };
    studentCollection
        .updateOne({ _id: ObjectId(req.params.id) }, { $set: updateData }, function (err, result) {
            res.send(result);
        });
});

router.delete('/:id', function (req, res) {

    studentCollection
        .remove({ _id: ObjectId(req.params.id) }, function (err, result) {
            res.send(result);
        });


});
module.exports = router; 