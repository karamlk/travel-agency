
import Card from '../components/BookingCard';
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import Spinner from '../components/Spinner';
import { toast } from "react-toastify";

const Bookings = () => {
    const [selectedTour, setSelectedTour] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);


    const tourOptions = [...new Set(bookings.map(b => b.tour?.name))];
    const statusOptions = ['pending', 'confirmed', 'canceled'];

    const filteredBookings = bookings.filter(b => {
        const matchTour = selectedTour === 'All' || b.tour?.name === selectedTour;
        const matchStatus = selectedStatus === 'All' || b.status === selectedStatus;
        return matchTour && matchStatus;
    });

   const fetchBookings = () => {
        setLoading(true);
        axiosClient
            .get('/admin/bookings')
            .then(response => {
                setBookings(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const confirmBooking = async (bookingId) => {
        setLoading(true); // Show full-page loading
        try {
            const response = await axiosClient.put(`/admin/bookings/${bookingId}`);
            toast.success(response.data.message);
            fetchBookings(); // Refresh bookings after confirmation
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to confirm booking');
            setLoading(false); // Stop loading if fetch fails
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">

            {/* Main Content */}
            <main className="flex-1 p-6 relative">
                <header className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Manage Bookings</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Review and confirm customer bookings</p>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">Filter by Tour:</label>
                            <select
                                value={selectedTour}
                                onChange={e => setSelectedTour(e.target.value)}
                                className="w-full p-2 rounded border bg-white dark:bg-gray-700 dark:text-gray-200"
                            >
                                <option value="All">All</option>
                                {tourOptions.map((tour, i) => (
                                    <option key={i} value={tour}>{tour}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">Filter by Status:</label>
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

                {/* Booking Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Spinner loading={loading} />
                        </div>
                    ) : filteredBookings.length > 0 ? (
                        filteredBookings.map((booking, index) => (
                            <Card key={index} booking={booking} onConfirm={confirmBooking} />
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">No bookings available.</p>
                    )}
                </div>
            </main>
        </div>

    );
}

export default Bookings;