import '@testing-library/jest-dom';

// jspdf probes <canvas> on import, which jsdom lacks; helpers import pulls it
jest.mock('jspdf', () => ({
  jsPDF: jest.fn(() => ({
    text: jest.fn(),
    line: jest.fn(),
    setLineWidth: jest.fn(),
    save: jest.fn(),
  })),
}));
