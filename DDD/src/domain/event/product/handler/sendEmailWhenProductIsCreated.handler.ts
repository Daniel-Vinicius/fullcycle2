import { EventHandlerInterface } from "@domain/event/@shared/eventHandler.interface";
import { ProductCreatedEvent } from "../productCreated.event";

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
	handle(event: ProductCreatedEvent): void {
		console.log(`Sending email of ${event.eventData.productName}`);
	}
}
