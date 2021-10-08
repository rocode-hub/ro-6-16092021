/* --------------------------------------------------------------------------------
object  ... user route
-------------------------------------------------------------------------------- */
const express = require('express');
const router = express.Router();
const userCtrl = require('../../js/controllers/user');

router.post('/signup', userCtrl.signup);            // Création (POST)
router.post('/login', userCtrl.login);              // Authentification (POST)

module.exports = router;
