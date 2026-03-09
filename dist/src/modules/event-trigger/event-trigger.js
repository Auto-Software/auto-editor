// EVENT TRIGGER : 
export class EventTrigger {
    events;
    constructor() {
        this.events = new Map();
    }
    on(eventName, callback) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName)?.push(callback);
    }
    emit(eventName, ...args) {
        const callbacks = this.events.get(eventName);
        if (callbacks) {
            callbacks.forEach(callback => callback(...args));
        }
    }
    off(eventName, callback) {
        if (!callback) {
            this.events.delete(eventName);
        }
        else {
            const callbacks = this.events.get(eventName);
            if (callbacks) {
                this.events.set(eventName, callbacks.filter(cb => cb !== callback));
            }
        }
    }
}
//# sourceMappingURL=event-trigger.js.map