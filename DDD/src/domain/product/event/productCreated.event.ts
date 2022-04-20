import { EventInterface } from "@domain/@shared/event/event.interface";

interface ProductCreatedEventPayload {
	product: {
		id: string;
		name: string;
		price: number;
	}
}

export class ProductCreatedEvent implements EventInterface {
	dateTimeOccurred: Date;
	payload: ProductCreatedEventPayload;

	constructor(eventPayload: ProductCreatedEventPayload) {
		this.dateTimeOccurred = new Date();
		this.payload = eventPayload;
	}
}
