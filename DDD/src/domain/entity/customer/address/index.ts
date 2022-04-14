export class Address {
	private _street: string;
	private _number: number;
	private _zip: number;
	private _city: string;

	constructor(street: string, number: number, zip: number, city: string) {

		this._street = street;
		this._number = number;
		this._zip = zip;
		this._city = city;

		this.validate();
	}

	validate() {
		if (!this._street) {
			throw new Error("Street is required");
		}

		if (this._number <= 0) {
			throw new Error("Number must be greater than 0");
		}

		if (this._zip <= 0) {
			throw new Error("Zip must be greater than 0");
		}

		if (!this._city) {
			throw new Error("City is required");
		}
	}

	toString() {
		return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
	}
}
