const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

// CREATE a new event
router.post('/', EventController.createEvent);

// GET all events
router.get('/',protect, EventController.getAllEvents);

// GET joined events for a user
router.get('/joinedevents', EventController.getUserJoinedEvents);

// Delete record
router.delete('/:id/leave', EventController.leaveEvent);

// GET a single event
router.get('/:id', EventController.getEventById);

// UPDATE an event
router.put('/:id', EventController.updateEvent);

// DELETE an event
router.delete('/:id', EventController.deleteEvent);

// Join event
router.post('/:id/join', EventController.joinEvent);

module.exports = router;
