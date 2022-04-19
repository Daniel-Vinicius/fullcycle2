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
		throw new Error("Method not implemented.");
	}

	register(eventName: string, eventHandler: EventHandlerInterface): void {
		if (!this.eventHandlers[eventName]) {
			this.eventHandlers[eventName] = [];
		}

		this._eventHandlers[eventName].push(eventHandler);
	}

	unregister(eventName: string, eventHandler: EventHandlerInterface): void {
		throw new Error("Method not implemented.");
	}

	unregisterAll(): void {
		throw new Error("Method not implemented.");
	}
}
