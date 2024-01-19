export const convertToCurrency = (value: number) => {
  const COP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  if (!value) {
    COP.format(0);
  }

  return COP.format(value);
};
