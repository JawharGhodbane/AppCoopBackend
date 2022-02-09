const express = require('express');

const Universite = require('../models/universite');

const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
var ObjectId = require('mongoose').Types.ObjectId;

// INITIALIZE ROUTER
const router = express.Router();

//ADD Universite
router.post('/univs/add', (req, res) => {
    const _univ = new Universite(req.body);

    _univ.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in university Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

//DELETE Universite
router.delete('/univs/delete/:id', (req, res) => {
   /* if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);*/

    Universite.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { 
            //res.send(doc);
            return res.send({
                success: true,
                message: 'university deleted successfuly'
              });
        }
        else { console.log('Error in Universite Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

//UPDATE Universite
router.put('/univs/update/:id',(req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        const _univ = new Universite(req.body);

    Universite.findByIdAndUpdate(req.params.id, { $set: _univ }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in Universite Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

//get by ID
router.get('/univs/:id', (req, res) => {
   /* if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);*/

    Universite.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in Retriving Universite :' + JSON.stringify(err, undefined, 2)); }
    });
});

//GET ALL
router.get('/univs', (req, res) => {
    Universite.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { res.send('Error in Retriving Universites :' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;