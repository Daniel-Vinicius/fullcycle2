import { EventInterface } from "@domain/@shared/event/event.interface";

interface Address {
  street: string;
  number: string;
  city: string;
  zip: string;
}

interface CustomerChangedAddressEventPayload {
  customer: {
    id: string;
    name: string;
    oldAddress: Address;
    newAddress: Address;
  }
}

export class CustomerChangedAddressEvent implements EventInterface {
	dateTimeOccurred: Date;
	payload: CustomerChangedAddressEventPayload;

	constructor(eventPayload: CustomerChangedAddressEventPayload) {
		this.dateTimeOccurred = new Date();
		this.payload = eventPayload;
	}
}
