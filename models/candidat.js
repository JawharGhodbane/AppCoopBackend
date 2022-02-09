const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidatSchema = new Schema(
    {
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        pays_origine: {
            type: String,
            required: true
        },
        mot_de_passe: {
            type: String,
            required: true,
            select: false
        },
       /* photo: {
            type: String,
            required: false
        },*/
       
    }
);

const Candidat = mongoose.model('Candidat', candidatSchema);
module.exports = Candidat;