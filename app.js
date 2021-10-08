/* --------------------------------------------------------------------------------
object  ... main module
-------------------------------------------------------------------------------- */
const express = require('express');
const dotenv = require('dotenv');
//const path = require('path');
const mongoose = require('mongoose');
//const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./js/routes/user');

// variables d'environnement
dotenv.config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPwd = process.env.DB_PWD;

// Connection base de données
const connectDb = `mongodb+srv://${dbUser}:${dbPwd}@cluster0.nbvdt.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(connectDb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// CORS
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
//app.use('/images', express.static(path.join(__dirname, 'images')));
//app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
