const express = require('express');
const Admin = require('../models/admin');
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const router = express.Router();

// LOGIN ADMIN
// JSON
router.post("/loginAdmin", async (req, res) => {
   
     // GET INPUT
     let nom = req.body.nom;
     const mot_de_passe = req.body.mot_de_passe;
     /*if(nom){
         nom= nom.toLowerCase()
     }*/
     // VALIDATE INPUT
     if (!(nom && mot_de_passe)) {
         res.status(400).send("All input is required");
     }
 
     // VALIDATE Admin
     const _admin = await Admin.findOne({ nom: nom }).select('+mot_de_passe');

     if (_admin && (await bcrypt.compare(mot_de_passe, _admin.mot_de_passe))) {
 
         // CREATE TOKEN
         const token = jwt.sign(
             {
                 id: _admin._id,
                 role: "Admin"
             },
             process.env.TOKEN_KEY,
             {
                 expiresIn: "24h",
             }
         );
 
         // RETURN Admin TOKEN
         return res.send({
            success: true,
            message: 'Admin logged in successfuly'
          });
     }
     else {
         return res.send({
            success: false,
            message: 'Invalid Credentials'
          });
     }
 
 });

 //add
 router.post('/admins/add', async (req, res) => {
    const _admin = new Admin(req.body);

    // ENCRYPTING mot_de_passe
    _admin.mot_de_passe = await bcrypt.hash(_admin.mot_de_passe, 10);

    // CONVERT nom TO LOWERCASE
    //_admin.nom = _admin.nom.toLowerCase();

    // VALIDATE INPUT
    if (!(_admin.nom && _admin.mot_de_passe)) {
        return res.send({
            success: false,
            message: 'All input are required'
          });
    }

    const oldAdmin = await Admin.findOne({ nom: _admin.nom });

    if (oldAdmin) {
        return res.status(409).send("Admin Already Exist. Please Login");
    }

    else {
        _admin.save()
            .then((result) => {

               // res.json(result);
               return res.send({
                success: true,
                message: 'Admin registered succesfuly'
              });
            })
            .catch((err) => {
               // res.send(err);
               return res.send({
                success: false,
                message: 'error',
                err
              });
            });
    }

})

module.exports = router;