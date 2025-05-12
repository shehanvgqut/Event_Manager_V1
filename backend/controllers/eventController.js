const EventService = require('../services/eventsService');

class EventController {
  // GET /api/events
  async getAllEvents(req, res) {
    try {
      const events = await EventService.getAllEvents();
      return res.json(events);
    } catch (err) {
      console.error('EventController: Error fetching events:', err.message);
      const status = err.statusCode || 500;
      return res.status(status).json({ msg: err.message || 'Server Error' });
    }
  }

  // GET /api/events/:id
  async getEventById(req, res) {
    try {
      const event = await EventService.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
      return res.json(event);
    } catch (err) {
      console.error('EventController: Error fetching event:', err.message);
      const status = err.statusCode || 500;
      return res.status(status).json({ msg: err.message || 'Server Error' });
    }
  }

  // POST /api/events
  async createEvent(req, res) {
    try {
      const eventData = {
        ...req.body,
        createdBy: req.user?._id || '609e129b9f1b2c001f23dabc' 
      };

      // Ensure sessions array exists to prevent crashes
      if (!Array.isArray(eventData.sessions)) {
        eventData.sessions = [];
      }

      const newEvent = await EventService.createEvent(eventData);
      return res.status(201).json(newEvent);
    } catch (err) {
      console.error('EventController: Error creating event:', err.message);
      const status = err.statusCode || 500;
      return res.status(status).json({ msg: err.message || 'Server Error' });
    }
  }

  // PUT /api/events/:id
  async updateEvent(req, res) {
    try {
      const updatedEvent = await EventService.updateEvent(req.params.id, req.body);
      if (!updatedEvent) {
        return res.status(404).json({ msg: 'Event not found' });
      }
      return res.json(updatedEvent);
    } catch (err) {
      console.error('EventController: Error updating event:', err.message);
      const status = err.statusCode || 500;
      return res.status(status).json({ msg: err.message || 'Server Error' });
    }
  }

  // DELETE /api/events/:id
  async deleteEvent(req, res) {
    try {
      const result = await EventService.deleteEvent(req.params.id);
      if (!result) {
        return res.status(404).json({ msg: 'Event not found' });
      }
      return res.json({ msg: 'Event deleted' });
    } catch (err) {
      console.error('EventController: Error deleting event:', err.message);
      const status = err.statusCode || 500;
      return res.status(status).json({ msg: err.message || 'Server Error' });
    }
  }

  async joinEvent(req, res) {
    const { id: eventId } = req.params;
    const { userId } = req.body;

    try {
      const updatedEvent = await EventService.joinEvent(eventId, userId);
      return res.json({ msg: 'Joined successfully', event: updatedEvent });
    } catch (err) {
      console.error('EventController: Error joining event:', err.message);
      const status = err.statusCode || 500;
      return res.status(status).json({ msg: err.message });
    }
  }
  
}

module.exports = new EventController();
