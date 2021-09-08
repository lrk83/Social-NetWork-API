const { Thought, User } = require("../models");

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    addThought({params, body }, res){
        Thought.create(body)
            .then(({_id}) => {
                console.log(_id);
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                ).populate({
                    path: 'thoughts',
                    select: '-__v'
                  })
                  .populate({
                    path: 'friends',
                    select: '-__v'
                  });
            })
            .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!' });
                  return;
                }
                res.json(dbUserData);
              })
              .catch(err => res.json(err));
    },

    getThoughtById(req,res){
        Thought.findOne({ _id: req.params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    updateThought(req,res){
        Thought.findOneAndUpdate({ _id: req.params.id},req.body,{ new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                  res.status(404).json({ message: 'No thought found with this id!' });
                  return;
                }
                res.json(dbThoughtData);
              })
              .catch(err => res.json(err))
    },

    removeThought(req,res){
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
                { thoughts: req.params.id },
                { $pull: { thoughts: req.params.id} },
                { new: true }
            );
        })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

module.exports= thoughtController;