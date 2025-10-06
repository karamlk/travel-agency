const DashboardCardRow = ({ label, value, color }) => {
    const baseClass = "text-lg font-bold";
    const colorClass =
        color === "green"
            ? "text-green-600 dark:text-green-400"
            : color === "red"
                ? "text-red-600 dark:text-red-400"
                : "text-gray-800 dark:text-gray-100";

    return (
        <div className="flex justify-between items-center py-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
            <span className={`${baseClass} ${colorClass}`}>{value}</span>
        </div>
    );
}

export default DashboardCardRow