/* eslint-disable max-len */

export const DarkMode = () => {
  const onClick = () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'dark') {
      localStorage.setItem('darkMode', '');
    } else {
      localStorage.setItem('darkMode', 'dark');
    }
  };
  return (
    <form>
      <button onClick={onClick} type="submit" className="fixed bottom-3 right-3 w-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-300 ring-0 rounded-lg hover:bg-gray-200 focus:ring-9 focus:outline-none dark:bg-white dark:hover:bg-gray-200 dark:ring-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white dark:text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      </button>
    </form>
  );
};
