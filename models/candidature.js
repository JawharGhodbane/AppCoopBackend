const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidatureSchema = new Schema(
    {

      //One candidat reference
        id_candidat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidat"
        },

        num_passeport: {
            type: String,
            required: true
        },
        date_deliv_passeport: {
            type: String,
            required: true
        },
        date_fin_passeport: {
            type: String,
            required: true,
        },
        pays_deliv_passeport: {
            type: String,
            required: true
        },
        section_bac: {
            type: String,
            required: true,
        },
        annee_bac: {
            type: String,
            required: false
        },

         //One UNIV reference
         universite: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Universite"
        },

        //One Etab reference
        etablissement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Etab"
        },

        //One Filiere reference
        filiere: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Filiere"
        },


    }
);

const Candidature = mongoose.model('Candidature', candidatureSchema);
module.exports = Candidature;