import { BiPlus } from 'react-icons/bi';
import Success from "./success";
import Bug from "./bug";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../lib/helper";

export default function AddUserForm({ formData, setFormData, onBack }) {
    const queryClient = useQueryClient();
    const addMutation = useMutation(addUser, {
        onSuccess: () => {
            queryClient.prefetchQuery('users', getUsers);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) return console.log("Don't have Form Data");

        const { firstname, lastname, email, salary, date, status } = formData;

        const model = {
            name: `${firstname} ${lastname}`,
            avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
            email,
            salary,
            date,
            status: status ?? "Active"
        };

        addMutation.mutate(model);
    };

    if (addMutation.isLoading) return <div>Loading!</div>;
    if (addMutation.isError) return <Bug message={addMutation.error.message}></Bug>;
    if (addMutation.isSuccess) return <Success message={"Added Successfully"}></Success>;

    return (
        <form className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium text-gray-700" htmlFor="firstname">First Name</label>
                <input 
                    type="text" 
                    onChange={setFormData} 
                    name="firstname" 
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="First Name" 
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium text-gray-700" htmlFor="lastname">Last Name</label>
                <input 
                    type="text" 
                    onChange={setFormData} 
                    name="lastname" 
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Last Name" 
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium text-gray-700" htmlFor="email">Email</label>
                <input 
                    type="email" 
                    onChange={setFormData} 
                    name="email" 
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Email" 
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium text-gray-700" htmlFor="salary">Salary</label>
                <input 
                    type="number" 
                    onChange={setFormData} 
                    name="salary" 
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Salary" 
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium text-gray-700" htmlFor="date">Date</label>
                <input 
                    type="date" 
                    onChange={setFormData} 
                    name="date" 
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium text-gray-700">Status</label>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <input 
                            type="radio" 
                            onChange={setFormData} 
                            value="Active" 
                            id="radioActive" 
                            name="status" 
                            className="mr-2" 
                        />
                        <label htmlFor="radioActive" className="text-gray-700">Active</label>
                    </div>
                    <div className="flex items-center">
                        <input 
                            type="radio" 
                            onChange={setFormData} 
                            value="Inactive" 
                            id="radioInactive" 
                            name="status" 
                            className="mr-2" 
                        />
                        <label htmlFor="radioInactive" className="text-gray-700">Inactive</label>
                    </div>
                </div>
            </div>
            <button 
                type="submit" 
                onClick={handleSubmit}
                className="flex items-center justify-center px-48 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Add <BiPlus size={24} className="ml-2" />
            </button>
        </form>
    );
}
