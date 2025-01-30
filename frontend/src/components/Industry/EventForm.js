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
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrm05uz4HYQwi2EJw7UNkxvbHKyugFCURdw&s",
        },
        {
            id: 2,
            name: "React Workshop",
            description: "Learn React from scratch",
            date: "2024-11-01",
            time: "10:00",
            image: "data:image/png;base64,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",

        },
        {
            id: 3,
            name: "AI & ML Meetup",
            description: "Meetup for AI and ML enthusiasts",
            date: "2024-11-15",
            time: "15:30",
            image: "data:image/jpeg;base64,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",
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
