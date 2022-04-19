import { EventInterface } from "@domain/event/@shared/event.interface";

interface ProductCreatedEventData {
  productId: string;
  productName: string;
}

export class ProductCreatedEvent implements EventInterface {
	dateTimeOccurred: Date;
	eventData: ProductCreatedEventData;

	constructor(eventData: ProductCreatedEventData) {
		this.dateTimeOccurred = new Date();
		this.eventData = eventData;
	}
}
