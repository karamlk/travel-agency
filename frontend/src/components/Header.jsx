const Header = ({ id, type = 'travel', title }) => {
    let label;
    switch (type) {
        case 'tour':
            label = 'Tour';
            break;
        case 'refund':
            label = 'Refund';
            break;
        default:
            label = 'Travel';
    }

    const heading = title || `${label} Details`;

    return (
        <header className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{heading}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage {label.toLowerCase()} ID: {id}
            </p>
        </header>
    );
};

export default Header;
