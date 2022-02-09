const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filiereSchema = new Schema(
    {
        code_filiere: {
            type: String,
            required: true
        },
       
        nom_filiere: {
            type: String,
            required: true
        },

        // ETAB reference
         etablissement:
            {
            type: mongoose.Schema.Types.ObjectId,
             ref: "Etab",
             required:true
            }

    }
);

const Filiere = mongoose.model('Filiere', filiereSchema);
module.exports = Filiere;