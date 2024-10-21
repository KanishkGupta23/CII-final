import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EventForm = () => {
    const { id } = useParams(); // Get the event ID from the URL parameters
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        image: null,
    });
    const [events, setEvents] = useState([]);
    // const navigate = useNavigate();

    // Mock Data for events
    const mockEvents = [
        {
            id: 1,
            name: "Tech Talk",
            description: "A talk on the latest trends in tech",
            date: "2024-10-30",
            time: "14:00",
            image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Tech+Talk",
        },
        {
            id: 2,
            name: "React Workshop",
            description: "Learn React from scratch",
            date: "2024-11-01",
            time: "10:00",
            image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=React+Workshop",
        },
        {
            id: 3,
            name: "AI & ML Meetup",
            description: "Meetup for AI and ML enthusiasts",
            date: "2024-11-15",
            time: "15:30",
            image: "https://via.placeholder.com/150/008000/FFFFFF?text=AI+Meetup",
        },
    ];

    // Fetch event details if editing (mocking with local data)
    useEffect(() => {
        setEvents(mockEvents); // Set the mock data as initial event list

        if (id) {
            const eventToEdit = mockEvents.find(event => event.id === parseInt(id));
            if (eventToEdit) {
                setFormData({
                    name: eventToEdit.name,
                    description: eventToEdit.description,
                    date: eventToEdit.date,
                    time: eventToEdit.time,
                    image: eventToEdit.image,
                });
            }
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEvent = {
            id: events.length + 1,
            ...formData,
        };

        if (id) {
            // Update event (mock action)
            setEvents(events.map(event => (event.id === parseInt(id) ? newEvent : event)));
            console.log("Updated event with ID:", id, formData);
        } else {
            // Create new event (mock action)
            setEvents([...events, newEvent]);
            console.log("Created new event:", formData);
        }

        // Mock redirection to event list
        // navigate('/');
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 w-full p-10">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full mb-8">
                <h1 className="text-2xl font-bold text-center mb-6">{id ? 'Edit Event' : 'Create Event'}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Event Name"
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <textarea
                            name="description"
                            value={formData.description}
                            placeholder="Event Description"
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-1/2">
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            accept="image/*"
                            required={!id} // Image is required only when creating
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {id ? 'Update Event' : 'Create Event'}
                    </button>
                </form>
            </div>

            {/* Display events below the form */}
            <div className="w-full max-w-4xl">
                <h2 className="text-xl font-bold text-center mb-4">Events</h2>
                <div className="space-y-4">
                    {events.map(event => (
                        <div key={event.id} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                            <img src={event.image} alt={event.name} className="w-16 h-16 object-cover rounded-md" />
                            <div>
                                <h3 className="text-lg font-semibold">{event.name}</h3>
                                <p>{event.description}</p>
                                <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventForm;
