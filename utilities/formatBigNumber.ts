export const formatBigNumber = (num: string | number, hasCurrencySymbol?: boolean) => {
  const value = Number(num);

  if (isNaN(value)) return '0' + (hasCurrencySymbol ? '₫' : '');

  return new Intl.NumberFormat('de-DE').format(value) + (hasCurrencySymbol ? '₫' : '');
};
