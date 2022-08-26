const mongoose = require('mongoose');

const Schema = mongoose.Schema;

function newToday () {
  const todayDate = new Date();
  return todayDate.toISOString().split('T')[0];
}

const ordersSchema = new Schema(
  {
    familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Families' },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Items' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    model: { type: String, uppercase: true },
    quantity: { type: Number },
    buyed: { type: Boolean, default: false },
    dateOrder: { type: String, default: newToday() },
    datePurchase: { type: String }
  },
  { collection: 'orders' }
);

module.exports = mongoose.model('Orders', ordersSchema);
