import { useState } from 'react';
import axiosClient from '../axiosClient';
import { Link, useNavigate } from 'react-router-dom';

const TravelForm = ({ initialData = {}, onCancel }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: initialData.name || '',
        description: initialData.description || '',
        country: initialData.country || '',
        slug: initialData.slug || '',
        number_of_days: initialData.number_of_days || '',
        is_public: initialData.is_public || true,
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            axiosClient.put(`/admin/travels/${initialData.id}`, formData);
            navigate('/dashboard/travels');
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setErrorMessage(response.data.error || 'Validation failed');
            }
        }
    };
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Edit Travel
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
                    <label className="text-sm text-gray-600 dark:text-gray-400">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="is_public"
                        checked={formData.is_public}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="text-sm text-gray-600 dark:text-gray-400">Public</label>
                </div>

                <div className="mt-6 flex gap-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TravelForm;
