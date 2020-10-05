const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  method: { type: String, required: true },
  email: { type: String, lowercase: true, required: true },
  password: { type: String },
  id: { type: String }
});

userSchema.pre('save', async function(next) {
  try {
    if(this.method !== 'local') {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch(error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch(error) {
    throw new Error(error);
  }
}

module.exports = mongoose.model('User', userSchema);