class JoinEventNotifierDecorator {
  constructor(eventService) {
    this.eventService = eventService;
  }

  async joinEvent(eventId, userId) {
    const result = await this.eventService.joinEvent(eventId, userId);
    // Decorated behavior: log or send a notification
    console.log(`[Notifier] User ${userId} joined event ${eventId}`);
    // e.g., call email service or webhook here
    return result;
  }

  // Proxy other methods
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  getEventById(id) {
    return this.eventService.getEventById(id);
  }

  createEvent(data) {
    return this.eventService.createEvent(data);
  }

  updateEvent(id, data) {
    return this.eventService.updateEvent(id, data);
  }

  deleteEvent(id) {
    return this.eventService.deleteEvent(id);
  }

  getUserJoinedEvents(userId) {
    return this.eventService.getUserJoinedEvents(userId);
  }

  leaveEvent(eventId, userId) {
    return this.eventService.leaveEvent(eventId, userId);
  }
}

module.exports = JoinEventNotifierDecorator;
