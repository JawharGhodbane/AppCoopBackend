const express = require('express');

const Etab = require('../models/etab');

const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
var ObjectId = require('mongoose').Types.ObjectId;

// INITIALIZE ROUTER
const router = express.Router();

//ADD Etab
router.post('/etabs/add', (req, res) => {
    const _etab = new Etab(req.body);

    _etab.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in university Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

//DELETE Etab
router.delete('/etabs/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Etab.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { 
           // res.send(doc);
           return res.send({
            success: true,
            message: 'etablissement deleted successfuly'
          });
         }
        else { res.send('Error in Etab Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

//UPDATE Etab
router.put('/etabs/update/:id',(req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        const _etab = new Etab(req.body);

    Etab.findByIdAndUpdate(req.params.id, { $set: _etab }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in Etab Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

//get by ID
router.get('/etabs/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Etab.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in Retriving Etab :' + JSON.stringify(err, undefined, 2)); }
    });
});

//GET ALL
router.get('/etabs', (req, res) => {
    Etab.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { res.send('Error in Retriving Etabs :' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;