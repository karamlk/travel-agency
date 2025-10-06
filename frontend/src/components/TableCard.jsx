const TableCard = ({ title, columns, data, renderRow }) => {
    return (
        <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
            <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
            </header>
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full dark:text-gray-300">
                        {/* Table header */}
                        <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs">
                            <tr>
                                {columns.map((col, i) => (
                                    <th key={i} className="p-2">
                                        <div className={`font-semibold ${col.align || "text-left"}`}>
                                            {col.label}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                            {data.map((row, i) => (
                                <tr key={i}>
                                    {renderRow(row)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TableCard;