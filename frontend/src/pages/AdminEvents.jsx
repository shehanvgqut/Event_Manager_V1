import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';  // use your configured axios

const AdminEvents = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // detect if editing

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        eventType: 'single',
        sessions: [{ startDate: '', startTime: '', endTime: '' }],
        location: '',
        description: ''
    });

    const [loading, setLoading] = useState(false);

    // Fetch event data if in edit mode
    useEffect(() => {
        const fetchEvent = async () => {
            if (id) {
                setLoading(true);
                try {
                    const response = await axiosInstance.get(`/api/events/${id}`);
                    const data = response.data;
                    setFormData({
                        title: data.title || '',
                        category: data.category || '',
                        eventType: data.eventType || 'single',
                        sessions: data.sessions?.length
                            ? data.sessions
                            : [{ startDate: '', startTime: '', endTime: '' }],
                        location: data.location || '',
                        description: data.description || ''
                    });
                } catch (error) {
                    console.error('Error fetching event:', error);
                    alert('Failed to load event data.');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSessionChange = (index, field, value) => {
        const updatedSessions = [...formData.sessions];
        updatedSessions[index][field] = value;
        setFormData({ ...formData, sessions: updatedSessions });
    };

    const addSession = () => {
        setFormData({
            ...formData,
            sessions: [...formData.sessions, { startDate: '', startTime: '', endTime: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Update existing event
                await axiosInstance.put(`/api/events/${id}`, formData);
                alert('Event updated successfully!');
            } else {
                // Create new event
                await axiosInstance.post('/api/events', formData);
                alert('Event created successfully!');
            }
            navigate('/admin_event_list');
        } catch (err) {
            console.error(err);
            alert('Failed to submit event.');
        }
    };

    if (loading) {
        return <div className="text-center mt-10 text-gray-500">Loading event data...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg mt-8">
            <h1 className="text-3xl font-bold mb-8">
                {id ? 'Edit Event' : 'Create a New Event'}
            </h1>

            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8">
                {/* <div className="flex-1">
                    <div className="w-full bg-gray-200 h-1 rounded-full">
                        <div className="w-1/4 bg-indigo-600 h-1 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                        <span className="text-indigo-600 font-medium">Edit</span>
                        <span>Banner</span>
                        <span>Ticketing</span>
                        <span>Review</span>
                    </div>
                </div> */}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Event Details */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Event Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter the name of your event"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Event Category <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Please select one"
                            />
                        </div>
                    </div>
                </div>

                {/* Date & Time */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Date & Time</h2>
                    <div className="flex items-center space-x-6 mb-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="eventType"
                                value="single"
                                checked={formData.eventType === 'single'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Single Event
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="eventType"
                                value="recurring"
                                checked={formData.eventType === 'recurring'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Recurring Event
                        </label>
                    </div>

                    {formData.sessions.map((session, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-4"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Start Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={session.startDate}
                                    onChange={(e) =>
                                        handleSessionChange(index, 'startDate', e.target.value)
                                    }
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Start Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="time"
                                    value={session.startTime}
                                    onChange={(e) =>
                                        handleSessionChange(index, 'startTime', e.target.value)
                                    }
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">End Time</label>
                                <input
                                    type="time"
                                    value={session.endTime}
                                    onChange={(e) =>
                                        handleSessionChange(index, 'endTime', e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addSession}
                        className="text-indigo-600 hover:underline text-sm mt-2"
                    >
                        + Add Another Session
                    </button>
                </div>

                {/* Location */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Location</h2>
                    <label className="block text-sm font-medium mb-1">
                        Where will your event take place? <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Please select one"
                    />
                </div>

                {/* Additional Information */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                    <label className="block text-sm font-medium mb-1">
                        Event Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Describe what's special about your event & other important details."
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
                    >
                        {id ? 'Update Event' : 'Save & Continue'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminEvents;
