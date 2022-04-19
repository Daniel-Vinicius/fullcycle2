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
});
