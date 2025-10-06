import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner';
import Header from '../components/Header';
import EntityDetails from '../components/EntityDetails';
import TourForm from '../components/TourForm';
import BookingCard from '../components/BookingCard';


const Tour = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tour, setTour] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const tourRes = await axiosClient.get(`/admin/tours/${id}`);
                setTour(tourRes.data.data);


                const bookingsRes = await axiosClient.get(`/admin/tours/${id}/customers`);
                setBookings(bookingsRes.data.data);

            } catch (err) {
                console.error('Error fetching tours or bookings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTourData();
    }, [id]);

    const handleEdit = () => setIsEditing(true);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this tour?')) return;

        try {
            await axiosClient.delete(`/admin/tours/${id}`);
            toast.success('Tour deleted successfully');
            navigate('/dashboard/tours');
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Failed to delete tour. Please try again.');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
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
                <Header id={id} type="tour" />

                <section className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow mb-6">
                    {isEditing ? (
                        <TourForm initialData={tour} onCancel={handleCancel} />
                    ) : (
                        <EntityDetails
                            data={tour}
                            type="tour"
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                    <Link to="/dashboard/tours" className="mt-4 inline-block text-green-600 hover:text-green-700">
                        Back to tours
                    </Link>
                </section>

                <section className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Customers for this Tour</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.length > 0 ? (
                            bookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No bookings found for this tour.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Tour;