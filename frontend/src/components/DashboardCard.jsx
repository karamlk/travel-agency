const DashboardCard = ({title, children}) => {
 return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5 pb-5">
        <header className="flex justify-between items-start mb-5">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
        </header>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}

export default DashboardCard