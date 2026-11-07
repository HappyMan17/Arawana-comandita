import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DarkMode } from ".";
import { useUser } from "../hooks";

/* eslint-disable max-len */
type SidebarProps = {
  children: ReactNode,
  logout: () => void,
}

const initState = {
  summaries: false,
  tables: false,
  plates: false,
};

export const Sidebar: React.FC<SidebarProps> = ({ children, logout }) => {
  const navigate = useNavigate();
  const { darkMode, changeDarkMode } = useUser();

  const [isActive, setIsActive] = useState(initState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onSelectPage = (route: string) => {
    const activeRoute = route.slice(1);
    setIsActive(() => ({
      ...initState,
      [activeRoute]: true,
    }));
    navigate(route);
    setIsSidebarOpen(false);
  };

  const onOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const onCloseSidebar = (event: any) => {
    const target = event.target.tagName;
    if (target !== 'DIV' && target !== 'BUTTON' && target !== 'svg' && target !== 'path') {
      setIsSidebarOpen(false);
    }
  };

  return (
    <main onClick={onCloseSidebar} className={ `${darkMode} max-h-dvh h-screen overflow-y-scroll ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}` }>
      <nav className="fixed top-0 z-50 left-0 w-full border-gray-700 bg-blue-950 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-5 justify-between sm:justify-end">
          <button onClick={onOpenSidebar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className={`inline-flex items-center ms-3 text-sm text-gray-500 rounded-lg ${isSidebarOpen ? 'hidden' : 'flex'} sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`} >
            <span className="sr-only">Open sidebar</span>
            {/* hamburguer logo */}
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          {/* Restaurant logo */}
          <a href="#" className="mx-3 flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Arawana</span>
          </a>
        </div>
      </nav>
      <DarkMode changeDarkMode={changeDarkMode} />

      {/* Sidebar */}
      <aside id="default-sidebar" className={`fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] transition-transform sm:translate-x-0 ${isSidebarOpen ? '' : '-translate-x-full hidden'} sm:flex`} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-blue-950 dark:bg-gray-800 w-[250px] flex flex-col justify-between">
          <ul className="space-y-2 font-medium">
            <li>
              <button onClick={() => onSelectPage('/summaries')} className={`flex items-center p-2 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 ${isActive.summaries && 'enabled:bg-blue-700 enabled:dark:bg-gray-700'} group w-full`} >
                <svg className="w-6 h-6 text-white dark:text-gray-400 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h6m-6 4h6m-6 4h6M1 1v18l2-2 2 2 2-2 2 2 2-2 2 2V1l-2 2-2-2-2 2-2-2-2 2-2-2Z"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-left text-white">Summaries</span>
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('/tables')} className={`flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group w-full ${isActive.tables && 'enabled:bg-blue-700 enabled:dark:bg-gray-700'}`} >
                <svg className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-left text-white">Mesas</span>
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('/plates')} className={`flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group w-full ${isActive.plates && 'enabled:bg-blue-700 enabled:dark:bg-gray-700'}`} >
                <svg className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-left text-white">Products</span>
              </button>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            <li>
              <button className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group w-full" onClick={logout}>
                <svg className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-left text-white">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Children */}
      <section className="max-h-dvh p-4 mt-16 mb-20 sm:ml-64">
        {children}
      </section>
    </main>

  );
};
