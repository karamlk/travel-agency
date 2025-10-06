import Card from '../components/RefundCard';
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import Spinner from '../components/Spinner';

const Refunds = () => {
    const [refunds, setRefunds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const statusOptions = ['pending', 'approved', 'rejected'];


    const filteredRefunds = refunds.filter(r => {
        const matchStatus = selectedStatus === 'All' || r.status === selectedStatus;
        return matchStatus;
    });


    useEffect(() => {
        axiosClient
            .get('/admin/refunds')
            .then(response => {
                setRefunds(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching refunds:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">

            {/* Main Content */}
            <main className="flex-1 p-6 relative">

                <header className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Manage Refunds</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View and manage all refund Refunds</p>
                    <div className="mt-4 flex gap-4">
                        <div className='flex flex-col'>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mr-2">Filter by Status:</label>
                            <select
                                value={selectedStatus}
                                onChange={e => setSelectedStatus(e.target.value)}
                                className="w-full p-2 rounded border bg-white dark:bg-gray-700 dark:text-gray-200"
                            >
                                <option value="All">All</option>
                                {statusOptions.map((status, i) => (
                                    <option key={i} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </header>

                {/* refund Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Spinner loading={loading} />
                        </div>
                    ) : filteredRefunds.length > 0 ? (
                        filteredRefunds.map(refund => <Card key={refund.id} item={refund} />)
                    ) :
                        (
                            <p className="text-gray-600 dark:text-gray-400">No refunds available.</p>
                        )
                    }
                </div>
            </main>
        </div>
    );
}

export default Refunds;