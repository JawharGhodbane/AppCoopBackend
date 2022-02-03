const express = require('express');

const Candidat = require('../models/candidat.js');

const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

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
        if (req.files) {

            if (req.files.pdp) {

                //Use the name of the input field (i.e. "pdp") to rcddrieve the uploaded file
                let pdp = req.files.pdp;

                //Use the mv() mcddhod to place the file in upload directory (i.e. "uploads")
                pdp.mv('./files/' + pdp.name);
                _cand.photo = pdp.name;
            }
        }

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

/*router.post("/loginCandidat", async (req, res) => {
    
        
        
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
        res.json(token);
    }
    else {
        res.status(400).send({ error: "Invalid Credentials" });
    }

});
*/
module.exports = router;