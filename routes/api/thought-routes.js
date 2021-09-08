const router = require('express').Router();
const { addThought, removeThought, getAllThought, getThoughtById, updateThought } = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
    .get(getAllThought)
    .post(addThought)

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)

// /api/comments/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').delete(removeThought);

module.exports = router;