/* --------------------------------------------------------------------------------
object  ... sauce route
-------------------------------------------------------------------------------- */
const express = require('express');
const router = express.Router();
const auth = require('../../js/middleware/auth');
const multer = require('../../js/middleware/multer-config');
const sauceCtlr = require('../../js/controllers/sauce');

router.post('/', auth, multer, sauceCtlr.newSauce);             // Création (POST)
router.get('/', auth, sauceCtlr.getAllSauce);                   // Read (GET)
router.get('/:id', auth, sauceCtlr.getOneSauce);                // Read specific one (GET)
router.put('/:id', auth, multer, sauceCtlr.updateSauce);        // Modification (PUT)
router.delete('/:id', auth, sauceCtlr.delSauce);                // Suppression (DELETE)
router.post('/:id/like', auth, sauceCtlr.rateSauce);            // Modification likes, dislikes, ... (POST)

module.exports = router;
