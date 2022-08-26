const mongoose = require('mongoose');

function newToday () {
  const todayDate = new Date();
  return todayDate.toISOString().split('T')[0];
}

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Families' },
    name: { type: String, uppercase: true },
    password: { type: String },
    active: { type: Boolean, default: true },
    pin: { type: String },
    email: { type: String },
    rol: { type: Number, default: 0 },
    dateSignup: { type: String, default: newToday() }
  },
  { collection: 'users' }
);

module.exports = mongoose.model('Users', usersSchema);
