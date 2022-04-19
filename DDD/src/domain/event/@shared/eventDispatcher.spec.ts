import { SendEmailWhenProductIsCreatedHandler } from "@domain/event/product/handler/sendEmailWhenProductIsCreated.handler";
import { EventDispatcher } from "./eventDispatcher";

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

});
