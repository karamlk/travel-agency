const EntityDetails = ({ data, type = 'travel', onEdit, onDelete, onRefundAction, onReject }) => {
    const isTour = type === 'tour';
    const isRefund = type === 'refund';

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {isRefund ? `Refund ID: ${data.id}` : data.name}
            </h3>

            {isTour ? (
                <>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Starting Date: {data.starting_date}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Ending Date: {data.ending_date}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Number of Days: {data.number_of_days}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Number of Nights: {data.number_of_nights}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Price: {data.price} $</p>
                </>
            ) : isRefund ? (
                <>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Booking Status: {data.booking?.status}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">User: {data.user?.name} ({data.user?.email})</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Refund Amount: ${data.refund_amount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Status: {data.status}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Refund Reason: {data.refund_reason}</p>
                    {data.rejection_reason && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Rejection Reason: {data.rejection_reason}</p>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Refunded At: {data.refunded_at
                        ? data.refunded_at
                        : 'Not refunded'}</p>
                </>
            ) : (
                <>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Country: {data.country}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Is Public: {data.is_public ? 'Yes' : 'No'}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Slug: {data.slug}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Description: {data.description}</p>
                </>
            )}

            <div className="mt-6 flex gap-4">
                {type === 'refund' ? (
                    data.status === 'pending' ? (
                        <>
                            <button
                                onClick={() => onRefundAction({
                                    status: 'approved',
                                    refundId: data.id,
                                })}
                                className="px-4 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => onReject(data.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
                            >
                                Reject
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span
                                className={`inline-block w-2 h-2 ${data.status === 'approved' ? 'bg-green-600' : 'bg-red-600'
                                    } rounded-full`}
                            ></span>
                            Refund already {data.status}
                        </div>


                    )
                ) : (
                    <>
                        <button
                            onClick={onEdit}
                            className="px-4 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={onDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>

        </div>
    );
};

export default EntityDetails;
