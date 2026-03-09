type Callback = (...args: any[]) => void;
export declare class EventTrigger {
    private events;
    constructor();
    on(eventName: string, callback: Callback): void;
    emit(eventName: string, ...args: any[]): void;
    off(eventName: string, callback?: Callback): void;
}
export {};
//# sourceMappingURL=event-trigger.d.ts.map