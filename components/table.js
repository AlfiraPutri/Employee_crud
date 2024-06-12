import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useReducer } from "react"
import { BiBrush } from 'react-icons/bi'
import Success from "./success"
import Bug from "./bug"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getUser, getUsers, updateUser } from "../lib/helper"
import { useDispatch } from 'react-redux';
import { deleteAction } from '../redux/reducer';
import { useRouter } from 'next/router';

export default function Table() {
    const queryClient = useQueryClient()
    const { isLoading, isError, data, error } = useQuery('users', getUsers)
    const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
        onSuccess: async (data) => {
            queryClient.prefetchQuery('users', getUsers)
        }
    })

    if (isLoading) return <div>Loading...!</div>
    if (isError) return <div>Error</div>

    const { name, avatar, salary, date, email, status } = data;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`;
        let updated = Object.assign({}, data, formData, { name: userName })
        await UpdateMutation.mutate(updated)
    }

    if (isLoading) return <div>Employee is Loading...</div>;
    if (isError) return <div>Got Error {error}</div>;

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full table-auto bg-white">
                <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Salary</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Birthday</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-50">
                    {
                        data.map((obj, i) => <Tr {...obj} key={i} />)
                    }
                </tbody>
            </table>
        </div>
    );
}

function Tr({ _id, name, avatar, email, salary, date, status }) {
    const dispatch = useDispatch();
    const navigate = useRouter();

    const onUpdate = () => {
        navigate.push(`/update_form/${_id}`);
    };

    const onDelete = () => {
        dispatch(deleteAction(_id));
    };

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
            <td className="px-6 py-4 whitespace-nowrap flex items-center">
                <img src={avatar || '#'} alt="" className="h-10 w-10 rounded-full object-cover mr-4 shadow-lg" />
                <span className="font-medium text-gray-700">{name || "Unknown"}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-gray-700">{email || "Unknown"}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-gray-700">{salary || "Unknown"}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-gray-700">{date || "Unknown"}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`${status === "Active" ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} px-3 py-1 rounded-full font-semibold`}>
                    {status || "Unknown"}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-4">
                <button className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200" onClick={onUpdate}>
                    <BiEdit size={20} />
                </button>
                <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={onDelete}>
                    <BiTrashAlt size={20} />
                </button>
            </td>
        </tr>
    );
}
