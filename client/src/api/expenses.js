import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function getExpenses(params = {}) {
  const res = await axios.get(`${API_URL}/expenses`, { params });
  return res.data;
}

export async function createExpense(payload) {
  const res = await axios.post(`${API_URL}/expenses`, payload);
  return res.data;
}

export async function updateExpense(id, patch) {
  const res = await axios.put(`${API_URL}/expenses/${id}`, patch);
  return res.data;
}

export async function deleteExpense(id) {
  const res = await axios.delete(`${API_URL}/expenses/${id}`);
  return res.data;
}

export async function getSummary({ from, to } = {}) {
  const res = await axios.get(`${API_URL}/expenses/summary`, { params: { from, to } });
  return res.data;
}
