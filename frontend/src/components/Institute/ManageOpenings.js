// src/ManageOpenings.js
import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import OpeningOverview from './OpeningOverview';
import EditOpeningForm from './EditOpeningForm';
import ConfirmationModal from './ConfirmationModal'; // Import the confirmation modal

const ManageOpenings = () => {
    const [openings, setOpenings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); // State for delete confirmation

    const API_URL = "https://cii-final-2.onrender.com/api/openings/openings";

    useEffect(() => {
        fetchOpenings();
    }, []);

    useEffect(() => {
        if (isEditFormOpen || isModalOpen || isConfirmDeleteOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isEditFormOpen, isModalOpen, isConfirmDeleteOpen]);

    const fetchOpenings = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch openings');
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setOpenings(data.data);
            } else {
                throw new Error('Fetched data is not an array');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setSelectedJob(id);
        setIsConfirmDeleteOpen(true); // Show confirmation modal
    };

    const confirmDelete = async () => {
        if (selectedJob) {
            try {
                const response = await fetch(`${API_URL}/${selectedJob._id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error('Failed to delete the opening');

                const updatedOpenings = openings.filter(opening => opening._id !== selectedJob._id);
                setOpenings(updatedOpenings);
                setSelectedJob(null); // Clear selected job
            } catch (error) {
                console.error("Error deleting opening:", error);
                setError(error.message);
            } finally {
                handleRetry();
                setIsConfirmDeleteOpen(false); // Close confirmation modal
            }
        }
    };

    const handleView = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const handleEdit = (job) => {
        setSelectedJob(job);
        setIsEditFormOpen(true);
    };

    const handleCloseEditForm = () => {
        setIsEditFormOpen(false);
        setSelectedJob(null);
    };

    const handleSaveEdit = (updatedJob) => {
        setOpenings(openings.map(job => (job._id === updatedJob._id ? updatedJob : job)));
        handleRetry();
        handleCloseEditForm();
    };

    const handleRetry = () => {
        fetchOpenings();
    };

    return (
        <div className="flex justify-center w-full px-2 md:px-10 items-start min-h-screen bg-gray-100 py-10">
            <div className="container bg-white shadow-lg rounded-lg w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 py-6">Manage Applications</h2>

                {error && (
                    <div className="text-red-500 text-center">
                        <p>{error}</p>
                        <button onClick={handleRetry} className="text-blue-500 hover:text-blue-700">
                            Retry
                        </button>
                    </div>
                )}

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-left border-collapse text-xs md:text-base">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border md:p-3 p-1.5 text-gray-600 font-semibold text-center">S.No.</th>
                                    <th className="border md:p-3 p-1.5 text-gray-600 font-semibold text-center">Job Title</th>
                                    <th className="border md:p-3 p-1.5 text-gray-600 font-semibold text-center">Description</th>
                                    <th className="border md:p-3 p-1.5 text-gray-600 font-semibold text-center">Opening Date</th>
                                    <th className="border md:p-3 p-1.5 text-gray-600 font-semibold text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {openings.map((opening, index) => (
                                    <tr key={opening._id} className="text-center bg-white hover:bg-gray-100">
                                        <td className="border md:p-3 py-2 px-1">{index + 1}</td>
                                        <td className="border md:p-3 py-2 px-1">{opening.job_title}</td>
                                        <td className="border md:p-3 py-2 px-1">{opening.description}</td>
                                        <td className="border md:p-3 py-2 px-1">{new Date(opening.opening_date).toLocaleDateString()}</td>
                                        <td className="border md:p-3 py-2 px-1 flex justify-center md:space-x-4 space-x-1">
                                            <button 
                                                className="text-blue-500 hover:text-blue-700" 
                                                aria-label="View"
                                                onClick={() => handleView(opening)}
                                            >
                                                <FaRegEye size={20} />
                                            </button>
                                            {/* <button 
                                                className="text-green-500 hover:text-green-700" 
                                                aria-label="Edit"
                                                onClick={() => handleEdit(opening)}
                                            >
                                                <TiPencil size={20} />
                                            </button> */}
                                            {/* <button onClick={() => handleDelete(opening)} className="text-red-500 hover:text-red-700" aria-label="Delete">
                                                <MdDelete size={20} />
                                            </button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {isModalOpen && selectedJob && (
                <OpeningOverview job={selectedJob} onClose={handleCloseModal} />
            )}

            {isEditFormOpen && selectedJob && (
                <EditOpeningForm job={selectedJob} onClose={handleCloseEditForm} onSave={handleSaveEdit} />
            )}

            {isConfirmDeleteOpen && (
                <ConfirmationModal 
                    job={selectedJob}
                    message="Are you sure you want to delete this opening?"
                    onConfirm={confirmDelete}
                    onCancel={() => setIsConfirmDeleteOpen(false)} // Close confirmation modal
                />
            )}
        </div>
    );
};

export default ManageOpenings;
