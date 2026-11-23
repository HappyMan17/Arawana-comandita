/* eslint-disable max-len */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components';
import { convertToCurrency, getTableStatus, tableStatusStyles } from '../../helpers';
import { useDaySummary, usePlates, useTable, useUser } from '../../hooks';

const card = 'rounded-lg bg-white dark:bg-gray-800 shadow p-4';

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { tables, isLoading, startGetingTables } = useTable();
  const { plates, startGetingPlates } = usePlates();
  // shortcut: shows $0 until a sale loads currentDaySummary; add a summary fetch if it must be accurate on first load
  const { currentDaySummary } = useDaySummary();

  useEffect(() => {
    startGetingTables();
    startGetingPlates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeTables = tables.filter(table => getTableStatus(table) !== 'free');
  const stats = [
    { label: 'Active tables', value: `${activeTables.length} / ${tables.length}` },
    { label: 'Sales today', value: convertToCurrency(currentDaySummary?.total ?? 0) },
    { label: 'Products', value: plates.length },
  ];

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
        Hi{ user?.name ? `, ${user.name}` : '' }
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        { stats.map(({ label, value }) => (
          <div key={label} className={card}>
            <p className="text-sm text-gray-600 dark:text-gray-300">{ label }</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{ value }</p>
          </div>
        )) }
      </div>

      <div className={card}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active tables</h2>
          <button onClick={() => navigate('/tables')} className="min-h-10 px-3 text-sm font-medium text-blue-700 hover:underline dark:text-blue-400">
            Go to tables
          </button>
        </div>
        {
          activeTables.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-300">No active tables right now.</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              { activeTables.map(table => {
                const { label, badge } = tableStatusStyles[getTableStatus(table)];
                return (
                  <li key={table.id}>
                    <button onClick={() => navigate('/tables')} className="w-full min-h-12 flex items-center gap-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                      <span className="flex-1 font-medium text-gray-900 dark:text-white truncate">{ table.name }</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${badge}`}>{ label }</span>
                      <span className="w-28 text-right font-semibold text-gray-900 dark:text-white">{ convertToCurrency(table.total) }</span>
                    </button>
                  </li>
                );
              }) }
            </ul>
          )
        }
      </div>

      { isLoading && <Loader /> }
    </section>
  );
};
