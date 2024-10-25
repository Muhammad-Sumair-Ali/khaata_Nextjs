
import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  transactions: [
    {
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
      type: { type: String, enum: ['give', 'get'], required: true },
      details: String
    }
  ],
  totalGive: { type: Number, default: 0 },
  totalGet: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;