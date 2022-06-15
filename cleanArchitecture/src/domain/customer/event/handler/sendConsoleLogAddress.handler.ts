import { EventHandlerInterface } from "@domain/@shared/event/eventHandler.interface";
import { CustomerChangedAddressEvent } from "../customerChangedAddress.event";

export class SendConsoleLogAddressHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {
	handle(event: CustomerChangedAddressEvent): void {
		// const { id, name, oldAddress, newAddress } = event.payload.customer;

		// console.log(`Customer ${name} with id ${id} changed address`);
		// console.log(`Old address: ${oldAddress.street} ${oldAddress.number}, ${oldAddress.city} - ${oldAddress.zip}`);
		// console.log(`New address: ${newAddress.street} ${newAddress.number}, ${newAddress.city} - ${newAddress.zip}`);
	}
}
