const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    thoughts: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
      }
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
