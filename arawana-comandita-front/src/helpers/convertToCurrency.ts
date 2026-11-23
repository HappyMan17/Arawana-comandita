const COP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0, // COP has no cents
  maximumFractionDigits: 0,
});

export const convertToCurrency = (value: number) => COP.format(value || 0);
