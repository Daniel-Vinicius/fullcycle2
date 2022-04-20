import { EventDispatcher } from "@domain/@shared/event/eventDispatcher";

import { CustomerCreatedEvent } from "./customerCreated.event";
import { SendConsoleLog1Handler } from "./handler/sendConsoleLog1.handler";
import { SendConsoleLog2Handler } from "./handler/sendConsoleLog2.handler";

describe("Customer created event tests", () => {
	it("should notify the event handlers of the creation of a product", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler1 = new SendConsoleLog1Handler();
		const eventHandler2 = new SendConsoleLog2Handler();

		const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
		const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

		eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
		eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

		expect(eventDispatcher.eventHandlers["CustomerCreatedEvent"].length).toBe(2);

		const eventPayload = {
			customer: {
				id: "123",
				name: "John Doe",
				active: false
			}			
		};

		const customerCreatedEvent = new CustomerCreatedEvent(eventPayload);

		eventDispatcher.notify(customerCreatedEvent);

		expect(spyEventHandler1).toHaveBeenCalled();
		expect(spyEventHandler2).toHaveBeenCalled();
	});

});
