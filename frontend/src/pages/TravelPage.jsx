import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner';
import Header from '../components/Header';
import EntityDetails from '../components/EntityDetails';
import TravelForm from '../components/TravelForm';
import TourCard from '../components/TourCard';
import BookingCard from '../components/BookingCard';

const Travel = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [travel, setTravel] = useState({});
    const [relatedTours, setRelatedTours] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTravelData = async () => {
            try {
                const travelRes = await axiosClient.get(`/admin/travels/${id}`);
                setTravel(travelRes.data.data);

                const toursRes = await axiosClient.get(`/admin/travels/${id}/tours`);
                setRelatedTours(toursRes.data.data);

                const bookingsRes = await axiosClient.get(`/admin/travels/${id}/customers`);
                setBookings(bookingsRes.data.data);

            } catch (err) {
                console.error('Error fetching travel, tours or bookings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTravelData();
    }, [id]);

    const handleEdit = () => setIsEditing(true);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this travel?')) return;

        try {
            await axiosClient.delete(`/admin/travels/${id}`);
            toast.success('Travel deleted successfully');
            navigate('/dashboard/travels');
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Failed to delete travel. Please try again.');
        }
    };

    const handleAddTour = () => {
        navigate('/dashboard/tours/add', { state: { travelId: id } });
    };

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
                <Header id={id} type="travel" />

                <section className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow mb-6">
                    {isEditing ? (
                        <TravelForm
                            initialData={travel}
                            onCancel={() => setIsEditing(false)}
                        />
                    ) : (
                        <EntityDetails
                            data={travel}
                            type="travel"
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                    <Link to="/dashboard/travels" className="mt-4 inline-block text-green-600 hover:text-green-700">
                        Back to Travels
                    </Link>
                </section>

                <section className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Related Tours</h3>
                        <button
                            onClick={handleAddTour}
                            className="px-4 py-2 bg-violet-600 text-white rounded-sm hover:bg-violet-700 text-sm"
                        >
                            Add Tour
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedTours.length > 0 ? (
                            relatedTours.map(tour => <TourCard key={tour.id} item={tour} />)
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No tours found for this travel.</p>
                        )}
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Customers for this Travel</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.length > 0 ? (
                            bookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No bookings found for this travel.</p>
                        )}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default Travel;
