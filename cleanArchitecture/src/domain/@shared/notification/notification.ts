import { NotificationError } from "./notification.error";

export type NotificationErrorProps = {
	message: string;
	context: string;
}

export class Notification {
	private _errors: NotificationErrorProps[] = [];

	public addError(error: NotificationErrorProps) {
		this.errors.push(error);
	}

	public hasErrors(): boolean {
		return this.errors.length > 0;
	}

	public throwErrorIfHasErrors() {
		if (this.hasErrors()) {
			throw new NotificationError(this.errors);
		}
	}

	public messages(context?: string): string {
		const errors = context ? this.errors.filter(error => error.context === context) : this.errors;
		const messages = errors.map(error => `${error.context}: ${error.message}`);
		const messagesSeparedByComma = messages.join(", ");

		return messagesSeparedByComma;
	}

	get errors() {
		return this._errors;
	}
}
