const mongoose = require('mongoose');

const Schema = mongoose.Schema;

function newToday () {
  const todayDate = new Date();
  return todayDate.toISOString().split('T')[0];
}

const itemsSchema = new Schema(
  {
    name: { type: String, uppercase: true },
    active: { type: Boolean, default: true },
    dateSignup: { type: String, default: newToday() }
  },
  { collection: 'items' }
);

module.exports = mongoose.model('Items', itemsSchema);
