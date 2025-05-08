class EventBuilder {
    constructor() {
        this.event = {
            sessions: [],
        };
    }

    setTitle(title) {
        this.event.title = title;
        return this;
    }

    setCategory(category) {
        this.event.category = category;
        return this;
    }

    setEventType(eventType) {
        this.event.eventType = eventType;
        return this;
    }

    addSession({ startDate, startTime, endTime }) {
        this.event.sessions.push({ startDate, startTime, endTime });
        return this;
    }

    setLocation(location) {
        this.event.location = location;
        return this;
    }

    setDescription(description) {
        this.event.description = description;
        return this;
    }

    setCreatedBy(userId) {
        this.event.createdBy = userId;
        return this;
    }

    setStatus(status) {
        this.event.status = status;
        return this;
    }

    setImageUrl(imageUrl) {
        this.event.imageUrl = imageUrl;
        return this;
    }

    build() {
        return this.event;
    }
}

module.exports = EventBuilder;
