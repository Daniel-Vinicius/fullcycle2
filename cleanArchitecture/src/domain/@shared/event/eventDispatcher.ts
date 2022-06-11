import { EventDispatcherInterface } from "./eventDispatcher.interface";

import { EventInterface } from "./event.interface";
import { EventHandlerInterface } from "./eventHandler.interface";

interface EventHandlers {
  [eventName: string]: EventHandlerInterface[];
}

export class EventDispatcher implements EventDispatcherInterface {
	private _eventHandlers: EventHandlers = {};

	get eventHandlers() {
		return this._eventHandlers;
	}

	notify(event: EventInterface): void {
		const eventName = event.constructor.name;
		const eventHandlersEvent = this._eventHandlers[eventName];

		if (eventHandlersEvent) {
			eventHandlersEvent.forEach(eventHandler => {
				eventHandler.handle(event);
			});
		}
	}

	register(eventName: string, eventHandler: EventHandlerInterface): void {
		if (!this._eventHandlers[eventName]) {
			this._eventHandlers[eventName] = [];
		}

		this._eventHandlers[eventName].push(eventHandler);
	}

	unregister(eventName: string, eventHandler: EventHandlerInterface): void {
		const eventHandlersFiltered = this._eventHandlers[eventName]
			.filter(EventH => EventH !== eventHandler);

		this._eventHandlers[eventName] = eventHandlersFiltered;
	}

	unregisterAll(): void {
		this._eventHandlers = {};
	}
}
