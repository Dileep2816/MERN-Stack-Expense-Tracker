import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, index: true },
    date: { type: Date, required: true, index: true },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Expense', ExpenseSchema);
