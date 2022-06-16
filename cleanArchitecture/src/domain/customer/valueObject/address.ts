import { Notification } from "@domain/@shared/notification/notification";

export class Address {
	private _street: string;
	private _number: number;
	private _zip: string;
	private _city: string;

	private context = "customer - Address";
	private notification: Notification;

	constructor(street: string, number: number, zip: string, city: string) {

		this._street = street;
		this._number = number;
		this._zip = zip;
		this._city = city;
		this.notification = new Notification();

		this.validate();
	}

	validate() {
		if (!this._street) {
			this.notification.addError({ message: "Street is required", context: this.context });
		}

		if (!this._number) {
			this.notification.addError({ message: "Number is required", context: this.context });
		}

		if (this._number <= 0) {
			this.notification.addError({ message: "Number must be greater than 0", context: this.context });
		}

		if (!this._zip) {
			this.notification.addError({ message: "Zip is required", context: this.context });
		}

		if (!this._city) {
			this.notification.addError({ message: "City is required", context: this.context });
		}

		this.notification.throwErrorIfHasErrors();
	}

	toString() {
		return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
	}

	toJSON() {
		return {
			street: this._street,
			number: this._number,
			zip: this._zip,
			city: this._city,
		};
	}

	get street(): string {
		return this._street;
	}

	get number(): number {
		return this._number;
	}

	get zip(): string {
		return this._zip;
	}

	get city(): string {
		return this._city;
	}
}
