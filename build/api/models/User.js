/**
 * User
 *
 * @description
 *    A short summary of the kind of data this model represents.
 *
 */
var bcrypt = require('bcrypt');
module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    nickname: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100
    },
    firstName: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100
    },
    lastName: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100
    },
    email: {
      type: 'email',
      required: true
    },
    dateOfBirth: {
      type: 'date',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    active: {
      type: 'boolean',
      required: true
    },
    fullName: function() {
      return this.firstName + ' ' + this.lastName
    },
    toJSON: function() {
      // this gives you an object with the current values
      var obj = this.toObject();
      // Remove the password object value
      delete obj.password;
      // return the new object without password
      return obj;
    }
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  }
};
