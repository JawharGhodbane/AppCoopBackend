const express = require('express');

const Candidature = require('../models/candidature');

const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

// INITIALIZE ROUTER
const router = express.Router();

//ADD Candidature
router.post('/candidatures/add', (req, res) => {
    const _cnd = new Candidature(req.body);

    _cnd.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in candidacy Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

//DELETE Candidature
router.delete('/candidatures/delete/:id', (req, res) => {
    /* if (!ObjectId.isValid(req.params.id))
         return res.status(400).send(`No record with given id : ${req.params.id}`);*/
 
     Candidature.findByIdAndRemove(req.params.id, (err, doc) => {
         if (!err) { 
            // res.send(doc);
            return res.send({
                success: true,
                message: 'candidature deleted successfuly'
              });
             }
         else { res.send('Error in Candidature Delete :' + JSON.stringify(err, undefined, 2)); }
     });
 });
 
 //UPDATE Candidature
 router.put('/candidatures/update/:id',(req, res) => {
     if (!ObjectId.isValid(req.params.id))
         return res.status(400).send(`No record with given id : ${req.params.id}`);
 
         const _cnd = new Candidature(req.body);
 
     Candidature.findByIdAndUpdate(req.params.id, { $set: _cnd }, { new: true }, (err, doc) => {
         if (!err) { res.send(doc); }
         else { res.send('Error in Candidature Update :' + JSON.stringify(err, undefined, 2)); }
     });
 });
 
 //get by ID
 router.get('/candidatures/:id', (req, res) => {
    /* if (!ObjectId.isValid(req.params.id))
         return res.status(400).send(`No record with given id : ${req.params.id}`);*/
 
     Candidature.findById(req.params.id, (err, doc) => {
         if (!err) { res.send(doc); }
         else { res.send('Error in Retriving Candidature :' + JSON.stringify(err, undefined, 2)); }
     });
 });
 
 //GET ALL
 router.get('/candidatures', (req, res) => {
     Candidature.find((err, docs) => {
         if (!err) { res.send(docs); }
         else { res.send('Error in Retriving Candidatures :' + JSON.stringify(err, undefined, 2)); }
     });
 });

module.exports = router;