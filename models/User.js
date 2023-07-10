const { Schema, model, Types } = require('mongoose');

var validateEmail = function(email) {
  var re = /^w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      trim: true,
      required: 'Username is required',
      unique: true,
    },
    email: {
      type: String,
      required: 'Email address is required',
      unique: true,
      trim: true,
      validate: [validateEmail, 'Please enter a valid email'],
    },
    thoughts: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
