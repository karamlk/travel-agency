import { useState, useEffect } from 'react';
import { data, Link } from 'react-router-dom';
import Card from '../components/TravelCard';
import axiosClient from '../axiosClient';
import Spinner from '../components/Spinner';

const Travels = () => {
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get('/admin/travels')
            .then(response => {
                setTravels(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching travels:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const [countryFilter, setCountryFilter] = useState('All');
    const countries = [...new Set(travels.map(t => t.country || 'Unknown'))];


    // Filter travels
    const filteredTravels =
        countryFilter === 'All'
            ? travels
            : travels.filter(travel => travel.country === countryFilter);


    return (

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            {/* Main Content */}
            <main className="flex-1 p-6 relative">

                <header className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Manage Travels</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View and manage all travel records</p>
                    <div className="mt-4 flex gap-4">
                        <div className='flex flex-col'>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mr-2">Filter by Country:</label>
                            <select
                                value={countryFilter}
                                onChange={e => setCountryFilter(e.target.value)}
                                className="p-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                            >
                                <option value="All">All</option>
                                {countries.map(country => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Link
                            to="/dashboard/travels/add"
                            className="fixed bottom-6 right-6 px-4 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 text-sm z-50"
                        >
                            Add Travel
                        </Link>
                    </div>
                </header>

                {/* Travel Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Spinner loading={loading} />
                        </div>
                    ) : filteredTravels.length > 0 ? (
                        filteredTravels.map(travel => <Card key={travel.id} item={travel} />)
                    ) : travels.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400">No travels available.</p>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">No travels found for this country.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Travels;