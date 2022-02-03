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

//---------------- Middlewares ----------------//
//CROS MW
app.use(cors());
//Body Parser MW
app.use(bodayParser.json());
//add other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
//Static public folder
app.use(express.static(path.join(__dirname, 'public')));

// Use all routes
app.use(CandidatsRoutes);

//Start the server
app.listen(process.env.PORT, () => {
  console.log('Express Server Started');
});