import { useLocation } from "react-router-dom";
import { useState } from 'react';
import axiosClient from '../axiosClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddTourPage = () => {
    const location = useLocation();
    const travelId = location.state?.travelId;
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        starting_date: '',
        ending_date: '',
        price: ''
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post(`/admin/travels/${travelId}/tours`, formData);
            toast.success('Tour added successfully');
            navigate(`/dashboard/travels/${travelId}`);
        } catch (err) {
            const response = err.response;
            if (response?.status === 422) {
                const errors = response.data.errors;
                const firstError = errors && Object.values(errors)[0]?.[0];
                setErrorMessage(firstError || response.data.message || 'Validation failed');
            } else {
                setErrorMessage('Something went wrong.');
            }
        }

    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => navigate(`/dashboard/travels/${travelId}`);


    return (
        <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-sm shadow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Add Tour
                </h3>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}

                    <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Starting Date</label>
                        <input
                            type="date"
                            name="starting_date"
                            value={formData.starting_date}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Ending Date</label>
                        <input
                            type="date"
                            name="ending_date"
                            value={formData.ending_date}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700"
                        >
                            Add
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTourPage;