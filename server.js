/*
 *  * Server Main entry point of the app
 * @Author: <jawhar ghodbane>
 * @Email: jawharghod@gmail.com
 */

require('dotenv').config();
require("./config/db").connect();
const express = require('express');
const bcrypt = require("bcryptjs");
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodayParser = require('body-parser');

//Intiailzie app with express
const app = express();

//Import all routes
const CandidatsRoutes = require('./routes/candidats');
const FilieresRoutes = require('./routes/filieres');
const EtabsRoutes = require('./routes/etabs');
const UnivsRoutes = require ('./routes/univs');
const CandidaturesRoutes = require ('./routes/candidatures');
const AdminRoutes = require ('./routes/admin');
//---------------- Middlewares ----------------//
//CROS MW
app.use(cors());
//Body Parser MW
app.use(bodayParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Static public folder
app.use(express.static(path.join(__dirname, 'public')));

// Use all routes
app.use(CandidatsRoutes);
app.use(FilieresRoutes);
app.use(EtabsRoutes);
app.use(UnivsRoutes);
app.use(CandidaturesRoutes);
app.use(AdminRoutes);
//Start the server
app.listen(process.env.PORT, () => {
  console.log('Express Server Started');
});