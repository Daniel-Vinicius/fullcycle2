import { EventDispatcher } from "./eventDispatcher";

import { SendEmailWhenProductIsCreatedHandler } from "@domain/product/event/handler/sendEmailWhenProductIsCreated.handler";
import { ProductCreatedEvent } from "@domain/product/event/productCreated.event";

describe("Domain events tests", () => {
	it("should register an event handler", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);

		const eventHandlersProductCreatedEvent = eventDispatcher.eventHandlers["ProductCreatedEvent"];

		expect(eventHandlersProductCreatedEvent).toBeTruthy();
		expect(eventHandlersProductCreatedEvent.length).toBe(1);
		expect(eventHandlersProductCreatedEvent).toContainEqual(eventHandler);
	});

	it("should unregister an event handler", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);
		expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1);

		eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
		expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(0);
		expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).not.toContainEqual(eventHandler);
	});

	it("should unregister all event handlers", () => {
		const eventDispatcher = new EventDispatcher();

		eventDispatcher.register("ProductCreatedEvent", new SendEmailWhenProductIsCreatedHandler());
		eventDispatcher.register("ProductCreatedEvent", new SendEmailWhenProductIsCreatedHandler());
		eventDispatcher.register("ProductCreatedEvent", new SendEmailWhenProductIsCreatedHandler());

		expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(3);

		eventDispatcher.unregisterAll();
		expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeFalsy();
	});

	it("should notify all event handlers of an event", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();
		const spyEventHandler = jest.spyOn(eventHandler, "handle");

		eventDispatcher.register("ProductCreatedEvent", eventHandler);
		expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1);

		const eventPayload = {
			product: {
				id: "123",
				name: "Shirt",
				price: 100,
		
			}			
		};

		const productCreatedEvent = new ProductCreatedEvent(eventPayload);

		eventDispatcher.notify(productCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalled();
	});

});
