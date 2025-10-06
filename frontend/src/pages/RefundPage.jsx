import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import EntityDetails from '../components/EntityDetails';

const Refund = () => {
    const { id } = useParams();

    const [refund, setrefund] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isRejection, setIsRejection] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [selectedRefundId, setSelectedRefundId] = useState(null);

    const handleReject = (refundId) => {
        setSelectedRefundId(refundId);
        setIsRejection(true);
    };

    const fetchrefundData = async () => {
        try {
            const refundRes = await axiosClient.get(`/admin/refunds/${id}`);
            setrefund(refundRes.data.data);

        } catch (err) {
            console.error('Error fetching refunds :', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchrefundData();
    }, [id]);

    const handleRefundAction = async ({ status, refundId, rejection_reason = null }) => {
        setLoading(true);
        try {
            await axiosClient.put(`/admin/refunds/${refundId}`, {
                status,
                rejection_reason,
            });
            toast.success(`Refund got ${status} successfully`)
            fetchrefundData();
            setIsRejection(false);
            setRejectionReason('');
            setSelectedRefundId(null);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to confirm booking');
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            <main className="flex-1 p-6">
                <Header id={id} type="refund" />
                <section className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow mb-6">
                    {isRejection ? (
                        <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded">
                            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Rejection Reason:</label>
                            <textarea
                                value={rejectionReason}
                                onChange={e => setRejectionReason(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
                                rows={3}
                            />
                            <div className="mt-3 flex gap-2">
                                <button
                                    disabled={!rejectionReason.trim()}
                                    className={`px-4 py-2 rounded ${rejectionReason.trim()
                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                        }`}
                                    onClick={() =>
                                        handleRefundAction({
                                            status: 'rejected',
                                            refundId: selectedRefundId,
                                            rejection_reason: rejectionReason,
                                        })
                                    }
                                >
                                    Confirm Rejection
                                </button>

                                <button
                                    onClick={() => {
                                        setIsRejection(false);
                                        setRejectionReason('');
                                    }}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : <EntityDetails
                        data={refund}
                        type="refund"
                        onRefundAction={handleRefundAction}
                        onReject={handleReject}
                    />}
                    <Link to="/dashboard/refunds" className="mt-4 inline-block text-green-600 hover:text-green-700">
                        Back to refunds
                    </Link>
                </section>
            </main>
        </div>
    );
}

export default Refund;