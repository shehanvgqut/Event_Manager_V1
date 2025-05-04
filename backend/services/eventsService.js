const Event = require('../models/Event');

class EventService {
  // Get all events (sorted by date)
  async getAllEvents() {
    try {
      return await Event.find();
    } catch (err) {
      console.error('EventService: Error fetching events:', err.message);
      throw new Error('Failed to fetch events. Please try again later.');
    }
  }

  // Get an event by ID
  async getEventById(id) {
    try {
      const event = await Event.findById(id);
      if (!event) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        throw error;
      }
      return event;
    } catch (err) {
      console.error(`EventService: Error fetching event with ID ${id}:`, err.message);
      if (err.name === 'CastError') {
        const error = new Error('Invalid event ID');
        error.statusCode = 400;
        throw error;
      }
      if (err.statusCode) throw err; // propagate expected errors
      throw new Error('Failed to fetch event. Please try again later.');
    }
  }

  // Delete an event by ID
  async deleteEvent(id) {
    try {
      const event = await Event.findById(id);
      if (!event) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        throw error;
      }

      await event.deleteOne();
      return { msg: 'Event deleted successfully' };
    } catch (err) {
      console.error('EventService: Error deleting event:', err.message);
      if (err.name === 'CastError') {
        const error = new Error('Invalid event ID');
        error.statusCode = 400;
        throw error;
      }
      if (err.statusCode) throw err;  // pass through expected errors
      throw new Error('Failed to delete event. Please try again later.');
    }
  }

  // Create a new event
  async createEvent(data) {
    try {
      const newEvent = new Event(data);
      await newEvent.save();
      return newEvent;
    } catch (err) {
      console.error('EventService: Error creating event:', err.message);
      throw new Error('Failed to create event. Please check your data.');
    }
  }

  // Update an event by ID
  async updateEvent(id, data) {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!updatedEvent) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        throw error;
      }
      return updatedEvent;
    } catch (err) {
      console.error('EventService: Error updating event:', err.message);
      if (err.name === 'CastError') {
        const error = new Error('Invalid event ID');
        error.statusCode = 400;
        throw error;
      }
      if (err.statusCode) throw err;
      throw new Error('Failed to update event.');
    }
  }
}

module.exports = new EventService();
