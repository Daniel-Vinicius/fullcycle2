import { EventHandlerInterface } from "@domain/event/@shared/eventHandler.interface";
import { CustomerCreatedEvent } from "../customerCreated.event";

export class SendConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent> {
	handle(event: CustomerCreatedEvent): void {
		console.log("This is the second console.log of the event CustomerCreatedEvent");
		console.log(event);
	}
}
