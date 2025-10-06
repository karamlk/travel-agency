import { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';

const TourForm = ({ initialData = {}, onCancel }) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        name: initialData.name || '',
        slug: initialData.slug || '',
        starting_date: initialData.starting_date || '',
        ending_date: initialData.ending_date || '',
        price: initialData.price || '',
    });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = e => {
        e.preventDefault();
        axiosClient.put(`/admin/tours/${initialData.id}`, formData)
            .then((data) => {
                navigate('/dashboard/tours');
            })
            .catch((err) => {
    const response = err.response;
    if (response && response.status === 422) {
        const errors = response.data.errors;
        const firstError = errors && Object.values(errors)[0]?.[0];
        setErrorMessage(firstError || response.data.message || 'Validation failed');
    }
});

    };

    const renderInput = (label, name, type = 'text') => (
        <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">{label}</label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
        </div>
    );

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Edit Tour</h3>

            <form onSubmit={handleSubmit} className="grid gap-4">
                {errorMessage && (
                    <div className="text-red-500 text-sm text-center">
                        {errorMessage}
                    </div>
                )}
                {renderInput('Name', 'name')}
                {renderInput('Slug', 'slug')}
                {renderInput('Starting Date', 'starting_date', 'date')}
                {renderInput('Ending Date', 'ending_date', 'date')}
                {renderInput('Price', 'price', 'number')}

                <div className="mt-6 flex gap-4">
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700">
                        Save
                    </button>
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TourForm;
