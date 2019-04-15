const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
   email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true
   },

   password: {
      required: true,
      type: String,
      minlength: 6,
      maxlength: 30
   }
});

module.exports = mongoose.model('user', userSchema);