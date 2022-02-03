const mongoose = require("mongoose");

//    MongoDB URL
const URI="mongodb://localhost:27017/CoopDataBase";
const PORT=3000;
exports.connect = () => {
    // CONNECT MONGOOSE

    mongoose.connect(URI, { useNewUrlParser: true })
        .then((result) => console.log('Connecting to Database '))
        .catch((err) => console.log(err));

    // CHECKING CONNECTION
    const db = mongoose.connection
    db.once('open', _ => {
        console.log('Database connected:', URI)
    })

    db.on('error', err => {
        console.error('connection error:', err)
    })
};