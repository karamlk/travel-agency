const BookingCard = ({ booking, onConfirm }) => {
    const { id, user, travel, tour, status } = booking;

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{travel.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tour.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Customer: {user.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Email: {user.email}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Status: <span className={`font-bold ${status === 'pending' ? 'text-yellow-500' : status === 'confirmed' ? 'text-green-600' : 'text-red-500'}`}>{status}</span></p>

            {status === 'pending' && (
                <button
                    onClick={() => onConfirm(id)}
                    className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                    Confirm Booking
                </button>
            )}
        </div>
    );
};

export default BookingCard;
