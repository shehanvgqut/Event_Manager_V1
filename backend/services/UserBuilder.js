class UserBuilder {
    constructor() {
      this.user = {};
    }
  
    setName(name) {
      this.user.name = name;
      return this;
    }
  
    setEmail(email) {
      this.user.email = email;
      return this;
    }
  
    setPassword(password) {
      this.user.password = password;
      return this;
    }
  
    setRole(role) {
      this.user.role = role;
      return this;
    }
  
    setAddress(address) {
      this.user.address = address;
      return this;
    }
  
    setUniversity(university) {
      this.user.university = university;
      return this;
    }
  
    setContactNumber(contactNumber) {
      this.user.contactNumber = contactNumber;
      return this;
    }
  
    build() {
      return this.user;
    }
  }
  
  module.exports = UserBuilder;
  