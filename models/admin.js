const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        nom: {
            type: String,
            required: true
        },
     
        mot_de_passe: {
            type: String,
            required: true,
            select: false
        },
        
    }
);

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;