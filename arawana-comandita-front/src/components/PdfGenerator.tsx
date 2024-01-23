/* eslint-disable max-len */

interface PdfGeneratorProps {
  onClick: () => void;
}

export const PdfGenerator: React.FC<PdfGeneratorProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="absolute left-40 top-5 flex justify-center items-center w-10 h-9 rounded-lg text-white dark:text-white bg-slate-600">
      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
      </svg>
    </button>
  );
};
