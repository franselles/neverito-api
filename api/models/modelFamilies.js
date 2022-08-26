const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const familiesSchema = new Schema(
  {
    name: { type: String, uppercase: true }
  },
  {
    collection: 'families'
  }
);

module.exports = mongoose.model('Families', familiesSchema);
