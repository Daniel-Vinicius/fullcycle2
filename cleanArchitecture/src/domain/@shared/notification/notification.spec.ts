import { Notification } from "./notification";

describe("Unit tests for notifications", () => {
	it("should create errors", () => {
		const notification = new Notification();
		const error = {
			message: "error message",
			context: "customer",
		};

		notification.addError(error);

		expect(notification.messages("customer")).toBe("customer: error message");

		const error2 = {
			message: "error message2",
			context: "customer",
		};

		notification.addError(error2);

		expect(notification.messages("customer")).toBe("customer: error message, customer: error message2");

		const error3 = {
			message: "error message3",
			context: "order",
		};

		notification.addError(error3);

		expect(notification.messages("customer")).toBe("customer: error message, customer: error message2");
		expect(notification.messages("order")).toBe("order: error message3");

		expect(notification.messages()).toBe("customer: error message, customer: error message2, order: error message3");
	});

});
