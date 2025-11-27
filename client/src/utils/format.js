import { format } from 'date-fns';

export function formatDate(date){
  try {
    return format(new Date(date), 'dd MMM yyyy');
  } catch {
    return '-';
  }
}

export function formatCurrency(n){
  const num = Number(n) || 0;
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(num);
}
