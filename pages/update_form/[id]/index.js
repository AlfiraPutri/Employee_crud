import { useState, useEffect } from 'react';
import { BiBrush } from 'react-icons/bi';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { updateUser } from '../../../lib/helper';

export default function UpdateFormPage() {
    const router = useRouter();
    const id = router.query.id;

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        salary: '',
        date: '',
        status: 'Active', // Default status
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const queryClient = useQueryClient();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${id}`);
                const data = await response.json();
                console.log("🚀 ~ fetchUser ~ response:", response)
                setUserData(data);
                const { name, email, salary, date, status } = data;
                const [firstname, lastname] = name ? name.split(' ') : ['', ''];
                setFormData({ firstname, lastname, email, salary, date, status });
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    const updateMutation = useMutation((newData) => updateUser(id, newData), {
        onSuccess: async () => {
            await queryClient.invalidateQueries('users');
            router.push('/');
        },
    });

    if (loading) return <div className="text-center text-lg font-medium">Loading...!</div>;
    if (error) return <div className="text-center text-lg font-medium text-red-500">Error: {error.message}</div>;

    const { name, salary, date, email, status } = userData || {};
    const [firstname, lastname] = name ? name.split(' ') : ['', ''];

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`;
        let updated = Object.assign({}, userData, formData, { name: userName });
        await updateMutation.mutate(updated);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full space-y-8">
                <h1 className="text-3xl font-extrabold text-center text-indigo-700">Update User</h1>
                <form className="bg-white shadow-lg rounded-lg p-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            onChange={handleFormDataChange}
                            value={formData.firstname}
                            name="firstname"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="First Name"
                        />
                        <input
                            type="text"
                            onChange={handleFormDataChange}
                            value={formData.lastname}
                            name="lastname"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="Last Name"
                        />
                        <input
                            type="email"
                            onChange={handleFormDataChange}
                            value={formData.email}
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="Email"
                        />
                        <input
                            type="number"
                            onChange={handleFormDataChange}
                            value={formData.salary}
                            name="salary"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="Salary"
                        />
                        <input
                            type="date"
                            onChange={handleFormDataChange}
                            value={formData.date}
                            name="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <div className="flex gap-10 items-center">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    checked={formData.status === "Active"}
                                    onChange={handleFormDataChange}
                                    value="Active"
                                    id="radioDefault1"
                                    name="status"
                                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />
                                <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                                    Active
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    checked={formData.status !== "Active"}
                                    onChange={handleFormDataChange}
                                    value="Inactive"
                                    id="radioDefault2"
                                    name="status"
                                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />
                                <label htmlFor="radioDefault2" className="inline-block text-gray-800">
                                    Inactive
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center text-md bg-yellow-500 text-white px-4 py-2 border border-transparent rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        Update <BiBrush size={24} className="ml-2" />
                    </button>
                </form>
            </div>
        </div>
    );
}
