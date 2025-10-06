import { Link } from 'react-router-dom';

const TourCard = ({ item }) => {
    const { id, name, starting_date, ending_date, price } = item;

    const details = [
        { label: 'Starting Date', value: starting_date },
        { label: 'Ending Date', value: ending_date },
        { label: 'Price', value: price },
    ];

    return (
        <Link
            to={`/dashboard/tours/${id}`}
            className="block w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800 p-4 dark:hover:border-indigo-400"
        >

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{name}</h3>
            {details.map((detail, index) => (
                <p key={index} className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {detail.label}: {detail.value}
                </p>
            ))}
        </Link>
    );
}

export default TourCard;