const router = require('express').Router();
const { addThought, removeThought, getAllThought, getThoughtById, updateThought, addReaction, removeReaction} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
    .get(getAllThought)
    .post(addThought)

// /api/thoughts/<thoughtId>
    router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)

// /api/thoughts/<thoughtId>/reacrions
router.route('/:id/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;