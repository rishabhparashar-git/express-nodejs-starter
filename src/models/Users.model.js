const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Hasher = require('../helpers/Hasher.helper');
const { JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRY } = process.env;

const Schema = new mongoose.Schema(
  {
    picture: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    mobile: {
      type: String
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

Schema.pre('save', async function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  const salt = await Hasher.getSalt(10);

  // hash the password using our new salt
  const hash = await Hasher.hash(user.password, salt);

  // override the cleartext password with the hashed one
  user.password = hash;
  next();
});

Schema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    Hasher.compare(candidatePassword, this.password)
      .then(isMatch => resolve(isMatch))
      .catch(err => reject(err));
  });
};

// Sign JWT and return
Schema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

Schema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id, email: this.email, name: this.name }, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRY);
};

exports.User = mongoose.model('User', Schema);
