import { useState } from 'react';
import axiosClient from '../axiosClient'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddTravelPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        country: '',
        number_of_days: '',
        is_public: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/admin/travels', formData);
            toast.success('Travel added successfully');
            navigate('/dashboard/travels');
        }  catch (err) {
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

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleCancel = () => {
        navigate('/dashboard/travels');
    };


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex p-6">   
        <main className="flex-1 p-6">    
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-sm shadow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Add Travel
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
            </main>     
        </div>
    );
}

export default AddTravelPage;