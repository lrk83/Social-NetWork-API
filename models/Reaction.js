const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionBody: {
      type: String,
      required: true,
      validate: [({ length }) => length <= 280, 'body must be less than 281 characters.']
    },
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
  });
  
  module.exports = reactionSchema;