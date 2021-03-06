const express = require('express');

const Candidat = require('../models/candidat.js');

const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
var ObjectId = require('mongoose').Types.ObjectId;

// INITIALIZE ROUTER
const router = express.Router();

// REGISTER CANDIDAT
// FORM-DATA

router.post('/registerCandidat', async (req, res) => {

    /*if (req.body.candidat._id === null) {
        delete req.body.candidat._id;
    }*/

    const _cand = new Candidat(req.body);

    // CONVERT EMAIL TO LOWERCASE
   // _cand.email = _cand.email.toLowerCase();

    // VALIDATE INPUT
    if (!(_cand.email && _cand.mot_de_passe && _cand.nom && _cand.prenom && _cand.pays_origine)) {
        res.status(400).send("All input are required");
    }

    const oldCandidat = await Candidat.findOne({ email: _cand.email });

    if (oldCandidat) {
        return res.status(409).send({ error: "candidat Already Exist. Please Login" });
    }

    else {
        // ENCRYPTING mot_de_passe
        _cand.mot_de_passe = await bcrypt.hash(_cand.mot_de_passe, 10);

            // PHOTO
       /* if (req.files) {

            if (req.files.pdp) {

                //Use the name of the input field (i.e. "pdp") to rcddrieve the uploaded file
                let pdp = req.files.pdp;

                //Use the mv() mcddhod to place the file in upload directory (i.e. "uploads")
                pdp.mv('./files/' + pdp.name);
                _cand.photo = pdp.name;
            }
        }*/

        console.log(_cand);

        Candidat.create(_cand)
            .then((result) => {
                console.log('here');
                Candidat.findOne({ email: result.email }).then(cdd => {

                    // CREATE TOKEN
                    const token = jwt.sign(
                        {
                            id: cdd._id,
                            role: "Candidat"
                        },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "24h",
                        }
                    );

                    // SAVE CANDIDAT TOKEN
                    res.json(token);
                })
                .catch((err) => {
                    res.send(err);
                });

            })
            .catch((err) => {
                res.send(err);
            });
    }

})


// LOGIN Candidat
// JSON

router.post("/loginCandidat", async (req, res) => {
    
        
        
    // GET INPUT
    let email = req.body.email;
    const mot_de_passe = req.body.mot_de_passe;
    if(email){
        email= email.toLowerCase()
    }
    // VALIDATE INPUT
    if (!(email && mot_de_passe)) {
        res.status(400).send("All input is required");
    }

    // VALIDATE CANDIDAT
    const _candidat = await Candidat.findOne({ email: email }).select('+mot_de_passe');


    if (_candidat && (await bcrypt.compare(mot_de_passe, _candidat.mot_de_passe))) {

        // CREATE TOKEN
        const token = jwt.sign(
            {
                id: _candidat._id,
                role: "candidat"
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h",
            }
        );

        // RETURN Candidat TOKEN
        return res.send({
            success: true,
            message: 'Candidat logged in successfuly'
          });
    }
    else {
        res.status(400).send({ error: "Invalid Credentials" });
    }

});

// DELETE Candidat
// JSON

router.delete('/candidats/delete/:id', (req, res) => {

    const id = req.params.id;

    if (!ObjectId.isValid(id))
    return res.status(400).send(`No record with given id : ${id}`);

    Candidat.findByIdAndDelete(id)
        .then((result) => {
            //res.send(result);
            return res.send({
                success: true,
                message: 'candidat deleted successfuly'
              });
        })
        .catch((err) => {
            res.send(err);
        })

})

// UPDATE Candidat
// FORM-DATA

router.put('/candidats/update/:id', async (req, res) => {

    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
    var _cand = {
        nom: req.body.nom,
        prenom: req.body.position,
        pays_origine: req.body.pays_origine,
        email: req.body.email,
        mot_de_passe: req.body.mot_de_passe
    };

    _cand.mot_de_passe = await bcrypt.hash(_cand.mot_de_passe, 10);

    Candidat.findByIdAndUpdate(req.params.id, { $set: _cand }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Candidat Update :' + JSON.stringify(err, undefined_cand)); }
    });
});

//get by ID
router.get('/candidats/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Candidat.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in Retriving Candidat :' + JSON.stringify(err, undefined, 2)); }
    });
});

//GET ALL
router.get('/candidats', (req, res) => {
    Candidat.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { res.send('Error in Retriving Candidats :' + JSON.stringify(err, undefined, 2)); }
    });
});

// CHANGE PASSWORD
router.put('/candidats/change_mdp/:id', async (req, res) => {
    const id = req.params.id;
    const _cand = await Candidat.findById(id).select('+mot_de_passe');
    if (_cand) {
        old_mdp = req.body.mot_de_passe;
        new_mdp = req.body.new_mot_de_passe;
        if (await bcrypt.compare(old_mdp, _cand.mot_de_passe)) {
            _cand.mot_de_passe = await bcrypt.hash(new_mdp, 10);
            await Candidat.findByIdAndUpdate(id, _cand);
            res.send("password changed");
        }
        else {
            res.status(400).send("same password");
        }
    }
    else {
        res.send("Candidat NOT FOUND");
    }
});

module.exports = router;