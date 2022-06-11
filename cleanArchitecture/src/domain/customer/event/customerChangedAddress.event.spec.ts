import { EventDispatcher } from "@domain/@shared/event/eventDispatcher";

import { CustomerChangedAddressEvent } from "./customerChangedAddress.event";
import { SendConsoleLogAddressHandler } from "./handler/sendConsoleLogAddress.handler";

describe("Customer changed of address event tests", () => {
	it("should notify the event handlers of the change of address of a customer", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler1 = new SendConsoleLogAddressHandler();

		const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

		eventDispatcher.register("CustomerChangedAddressEvent", eventHandler1);

		expect(eventDispatcher.eventHandlers["CustomerChangedAddressEvent"].length).toBe(1);

		const eventPayload = {
			customer: {
				id: "123",
				name: "John Doe",
				oldAddress: {
					street: "Old Street",
					number: "123",
					city: "Old City",
					zip: "12345"
				},
				newAddress: {
					street: "New Street",
					number: "473",
					city: "New City",
					zip: "54321"
				}
			}			
		};

		const customerCreatedEvent = new CustomerChangedAddressEvent(eventPayload);

		eventDispatcher.notify(customerCreatedEvent);

		expect(spyEventHandler1).toHaveBeenCalled();
	});

});
