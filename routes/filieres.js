const express = require('express');

const Filiere = require('../models/filiere.js');

const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
var ObjectId = require('mongoose').Types.ObjectId;

// INITIALIZE ROUTER
const router = express.Router();

//ADD FILIERE
router.post('/filieres/add', (req, res) => {
    var f = new Filiere({
        nom_filiere: req.body.nom_filiere,
        code_filiere: req.body.code_filiere,
    });

    f.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in filiere Save :' + JSON.stringify(err, undefined, 2)); }
    });
});


//DELETE FILIERE
router.delete('/filieres/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Filiere.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            // res.send(doc);
            return res.send({
                success: true,
                message: 'filiere deleted successfuly'
              });
        }
        else { res.send('Error in Filiere Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

//UPDATE FILIERE
router.put('/filieres/update/:id',(req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        var f = new Filiere({
            nom_filiere: req.body.nom_filiere,
            code_filiere: req.body.code_filiere,
        });

    Filiere.findByIdAndUpdate(req.params.id, { $set: f }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in filiere Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

//get by ID
router.get('/filieres/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Filiere.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in Retriving Filiere :' + JSON.stringify(err, undefined, 2)); }
    });
});

//GET ALL
router.get('/Filieres', (req, res) => {
    Filiere.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { res.send('Error in Retriving Filieres :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;