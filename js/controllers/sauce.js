/* --------------------------------------------------------------------------------
object  ... sauce controllers
-------------------------------------------------------------------------------- */
const Sauce = require('../../js/models/sauce');
const fs = require('fs');

// Création (POST)
exports.newSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

// Read (GET)
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Read One Specific (GET)
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Update (PUT)
exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

// Delete (DELETE)
exports.delSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Update likes, dislikes, usersLiked, usersDisliked (POST)
exports.rateSauce = (req, res, next) => {

    const idUser  = req.body.userId;
    const idSauce = req.params.id;

    switch(req.body.like) {
        case 1:     // ajout like
            Sauce.updateOne({ _id: idSauce }, { $push: { usersLiked: idUser },  $inc: { likes: 1 }})
                .then(() => res.status(201).json({ message: '\"J\'aime\" ajouté !' }))
                .catch(error => res.status(400).json({ error }));
                break;
        case -1:    // ajout dislike
            Sauce.updateOne({ _id: idSauce }, { $push: { usersDisliked: idUser },  $inc: { dislikes: 1 }})
                .then(() => res.status(201).json({ message: '\"J\'aime pas\" ajouté !' }))
                .catch(error => res.status(400).json({ error }));
                break;
        case 0:     // annule like ou dislike
            Sauce.findOne({ _id: req.params.id })
                .then(sauce => {
                    if (sauce.usersLiked.indexOf(idUser) > -1) {
                        Sauce.updateOne({ _id: idSauce }, { $pull: { usersLiked: idUser },  $inc: { likes: -1 }})
                            .then(() => res.status(201).json({ message: '\"J\'aime\" retiré !' }))
                            .catch(error => res.status(400).json({ error }));
                    } else {
                        Sauce.updateOne({ _id: idSauce }, { $pull: { usersDisliked: idUser },  $inc: { dislikes: -1 }})
                        .then(() => res.status(201).json({ message: '\"J\'aime pas\" retiré !' }))
                        .catch(error => res.status(400).json({ error }));
                    }})
                .catch(error => res.status(404).json({ error }));
                break;
        default:
            console.error('like n\'a pas une valeur attendue !');
    }
};
