
// EVENT TRIGGER : 

type Callback = (...args: any[]) => void;

export class EventTrigger {
    
    private events: Map<string, Callback[]>;

    constructor() {
        this.events = new Map();
    }

    public on(eventName: string, callback: Callback): void {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName)?.push(callback);
    }

    public emit(eventName: string, ...args: any[]): void {
        const callbacks = this.events.get(eventName);
        if (callbacks) {
            callbacks.forEach(callback => callback(...args));
        }
    }

    public off(eventName: string, callback?: Callback): void {
        if (!callback) {
            this.events.delete(eventName);
        } else {
            const callbacks = this.events.get(eventName);
            if (callbacks) {
                this.events.set(eventName, callbacks.filter(cb => cb !== callback));
            }
        }
    }
}