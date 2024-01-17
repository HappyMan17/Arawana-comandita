/* eslint-disable max-len */
interface TableCardProps {
    image: string;
    name: string;
    comment: string;
    food: string[]
}

export const TableCard: React.FC<TableCardProps> = ({ image, food, name, comment }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex item-center justify-center">
                <img className="rounded-t-lg" src={image} alt="" />
            </div>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ name }</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    { comment }
                </p>
                {/* Product list */}
                <div className="flex flex-wrap">
                    {
                        food.map(item => {
                            return (
                                <a href="#" className="my-1 mx-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800" key={item}>
                                    { item }
                                </a>
                            );
                        })
                    }
                </div>
                {/* add product */}
                <div className="flex flex-wrap justify-between mt-2">
                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add product
                    </button>
                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">
                        Remove table
                    </button>
                </div>
            </div>
        </div>
    );
};

