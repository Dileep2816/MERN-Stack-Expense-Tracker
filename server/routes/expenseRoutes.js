import { Router } from 'express';
import { listExpenses, createExpense, updateExpense, deleteExpense, summaryByCategory } from '../controllers/expenseController.js';

const router = Router();

router.get('/', listExpenses);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
router.get('/summary', summaryByCategory);

export default router;
