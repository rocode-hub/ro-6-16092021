/* --------------------------------------------------------------------------------
object  ... sauce route
-------------------------------------------------------------------------------- */
const express = require('express');
const router = express.Router();
const auth = require('../../js/middleware/auth');
const multer = require('../../js/middleware/multer-config');
const sauceCtlr = require('../../js/controllers/sauce');

router.post('/', auth, multer, sauceCtlr.newSauce);             // Création (POST)
router.get('/', auth, sauceCtlr.getAllThing);                   // Read (GET)
router.get('/:id', auth, sauceCtlr.getOneThing);                // Read specific one (GET)
router.put('/:id', auth, multer, sauceCtlr.updateThing);        // Modification (PUT)
router.delete('/:id', auth, sauceCtlr.delThing);                // Suppression (DELETE)

module.exports = router;
