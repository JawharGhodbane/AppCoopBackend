const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const universiteSchema = new Schema(
    {
        code_univ: {
            type: String,
            required: true
        },
       
        nom_univ: {
            type: String,
            required: true
        },
         
    }
);

const Universite = mongoose.model('Universite', universiteSchema);
module.exports = Universite;