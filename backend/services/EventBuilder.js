class EventBuilder {
    constructor() {
      this.event = {};
    }
  
    setTitle(title) {
      this.event.title = title;
      return this;
    }
  
    setDescription(description) {
      this.event.description = description;
      return this;
    }
  
    setDate(date) {
      this.event.date = date;
      return this;
    }
  
    setUniversity(university) {
      this.event.University = university;  // 🛑 Note: property is capitalized in your schema
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
  