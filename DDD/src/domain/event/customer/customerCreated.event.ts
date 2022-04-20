import { EventInterface } from "@domain/event/@shared/event.interface";

interface CustomerCreatedEventPayload {
	customer: {
		id: string;
		name: string;
		active: boolean;
	}
}

export class CustomerCreatedEvent implements EventInterface {
	dateTimeOccurred: Date;
	payload: CustomerCreatedEventPayload;
  
	constructor(eventPayload: CustomerCreatedEventPayload) {
		this.dateTimeOccurred = new Date();
		this.payload = eventPayload;
	}
}
