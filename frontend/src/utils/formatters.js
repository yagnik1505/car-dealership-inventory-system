export const formatCurrency = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatNumber = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return '0';
  return new Intl.NumberFormat('en-US').format(num);
};
