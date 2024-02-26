type CustomEventWithData<T> = CustomEvent & { detail: T };

function subscribe<T>(eventName: string, listener: (event: CustomEventWithData<T>) => void) {
    document.addEventListener(eventName, (evt: Event) => {
        if (evt instanceof CustomEvent) {
            listener(evt as CustomEventWithData<T>);
        }
    });
}

function unsubscribe<T>(eventName: string, listener: (event: CustomEventWithData<T>) => void) {
    document.removeEventListener(eventName, (evt: Event) => {
        if (evt instanceof CustomEvent) {
            listener(evt as CustomEventWithData<T>);
        }
    });
}

function publish<T>(eventName: string, data: T) {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe };
