export class Observable {
    constructor() {
        this.subscribers = []
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber)
    }
    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter((i) => i !== subscriber)
    }
    notify(data) {
        this.subscribers.forEach(sub => {sub(data)});
    }
}