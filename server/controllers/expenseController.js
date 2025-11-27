import Expense from '../models/ExpenseModel.js';

export const listExpenses = async (req, res, next) => {
  try {
    const { sortBy = 'date', order = 'desc', q = '', category = '', from, to } = req.query;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (category) filter.category = category;
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
    const items = await Expense.find(filter).sort(sort).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date, notes } = req.body;
    if (!title || amount == null || !category || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const exp = await Expense.create({ title, amount, category, date, notes });
    res.status(201).json(exp);
  } catch (err) {
    next(err);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exp = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    if (!exp) return res.status(404).json({ message: 'Not found' });
    res.json(exp);
  } catch (err) {
    next(err);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exp = await Expense.findByIdAndDelete(id);
    if (!exp) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const summaryByCategory = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const match = {};
    if (from || to) {
      match.date = {};
      if (from) match.date.$gte = new Date(from);
      if (to) match.date.$lte = new Date(to);
    }

    const pipeline = [
      { $match: match },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $project: { _id: 0, category: '$_id', total: 1 } },
      { $sort: { total: -1 } }
    ];

    const data = await Expense.aggregate(pipeline);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
