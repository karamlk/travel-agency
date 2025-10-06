import Card from '../components/TourCard';
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import Spinner from '../components/Spinner';

const Tours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get('/admin/tours')
            .then(response => {
                setTours(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching tours:', error);
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
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Manage Tours</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View and manage all tour records</p>
                </header>

                {/* tour Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Spinner loading={loading} />
                        </div>
                    ) : tours.length > 0 ? (
                        tours.map(tour => <Card key={tour.id} item={tour} />)
                    ) :
                        (
                            <p className="text-gray-600 dark:text-gray-400">No tours available.</p>
                        )
                    }
                </div>
            </main>
        </div>
    );
}

export default Tours;