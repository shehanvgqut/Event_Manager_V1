class InactivityService {
    static instance = null;
  
    constructor(timeoutDuration, onTimeoutCallback) {
      if (InactivityService.instance) {
        return InactivityService.instance;
      }
  
      this.timeoutDuration = timeoutDuration;
      this.onTimeoutCallback = onTimeoutCallback;
      this.inactivityTimeout = null;
      this.isActive = false;
  
      InactivityService.instance = this;
      return this;
    }
  
    start() {
      if (this.isActive) return;  // Already started
      this.isActive = true;
      this.attachListeners();
      this.resetTimer();  // Start the timer
    }
  
    stop() {
      this.isActive = false;
      this.removeListeners();
      if (this.inactivityTimeout) clearTimeout(this.inactivityTimeout);
    }
  
    resetTimer = () => {
      if (this.inactivityTimeout) clearTimeout(this.inactivityTimeout);
      if (this.isActive) {
        this.inactivityTimeout = setTimeout(() => {
          this.onTimeoutCallback();
        }, this.timeoutDuration);
      }
    };
  
    attachListeners() {
      window.addEventListener('mousemove', this.resetTimer);
      window.addEventListener('keydown', this.resetTimer);
      window.addEventListener('click', this.resetTimer);
      window.addEventListener('scroll', this.resetTimer);
    }
  
    removeListeners() {
      window.removeEventListener('mousemove', this.resetTimer);
      window.removeEventListener('keydown', this.resetTimer);
      window.removeEventListener('click', this.resetTimer);
      window.removeEventListener('scroll', this.resetTimer);
    }
  }
  
  export default InactivityService;
  