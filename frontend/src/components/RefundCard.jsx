import { Link } from "react-router-dom";

const RefundCard = ({ item }) => {
    const { id, booking, user, refund_amount, status,
        refund_reason, rejection_reason, refunded_at } = item;

    const details = [
        { label: 'Email', value: user.email },
        { label: 'Status', value: <span className={`font-bold ${status === 'pending' ? 'text-yellow-500' : status === 'approved' ? 'text-green-600' : 'text-red-500'}`}>{status}</span> },
        { label: 'Refund Amount', value: refund_amount },
    ];

    return (
        <Link
            to={`/dashboard/refunds/${id}`}
            className="block w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800 p-4 dark:hover:border-indigo-400"
        >

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{user.name}</h3>
            {details.map((detail, index) => (
                <p key={index} className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {detail.label}: {detail.value}
                </p>
            ))}
        </Link>
    );
}

export default RefundCard;