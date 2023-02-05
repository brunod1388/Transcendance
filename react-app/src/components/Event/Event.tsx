interface IEvent {
    component: JSX.Element | null;
}

export class Event implements IEvent {
    component: JSX.Element | null;

    constructor(newComponent: JSX.Element | null) {
        this.component = newComponent;
    }
}
