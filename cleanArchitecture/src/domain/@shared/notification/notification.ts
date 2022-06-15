export type NotificationError = {
	message: string;
	context: string;
}

export class Notification {
	private errors: NotificationError[] = [];

	public addError(error: NotificationError) {
		this.errors.push(error);
	}

	public messages(context?: string): string {
		const errors = context ? this.errors.filter(error => error.context === context) : this.errors;
		const messages = errors.map(error => `${error.context}: ${error.message}`);

		return messages.join(", ");
	}
}
