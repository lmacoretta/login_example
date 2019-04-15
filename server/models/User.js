const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const brcypt = require('bcryptjs');

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

/** Encripto el password */
userSchema.pre('save', async function(next) {
   try {
      const salt = await brcypt.genSalt(10);

      //Genero el password con el hash (salt + hash)
      const hashPassword = await brcypt.hash(this.password, salt);

      //Remplazo la passwors de texto plana por esta encriptada.
      this.password = hashPassword;
      next();

   } catch (err) {
      next(err);
   }
});

/** Comparo la password */
userSchema.methods.isValidPassword = async function(newPassword) {
   try {
      return await brcypt.compare(newPassword, this.password);
   } catch (err) {
      throw new Error(err);
   }
}

module.exports = mongoose.model('user', userSchema);