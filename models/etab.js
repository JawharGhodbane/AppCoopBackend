const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const etabSchema = new Schema(
    {

        code_etab:{
            type: String,
            required: true
        },
       
        nom_etab: {
            type: String,
            required: true
        },

         // UNIV reference
        universite:
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Universite",
            required: true
        }
   
    }
);

const Etab = mongoose.model('Etab', etabSchema);
module.exports = Etab;