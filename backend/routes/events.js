const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');

// CREATE a new event
router.post('/', EventController.createEvent);

// GET all events
router.get('/', EventController.getAllEvents);

// GET a single event
router.get('/:id', EventController.getEventById);

// UPDATE an event
router.put('/:id', EventController.updateEvent);

// DELETE an event
router.delete('/:id', EventController.deleteEvent);

module.exports = router;
