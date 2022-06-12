export class Address {
	private _street: string;
	private _number: number;
	private _zip: string;
	private _city: string;

	constructor(street: string, number: number, zip: string, city: string) {

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

		if (!this._number) {
			throw new Error("Number is required");
		}

		if (this._number <= 0) {
			throw new Error("Number must be greater than 0");
		}
		
		if (!this._zip) {
			throw new Error("Zip is required");
		}

		if (!this._city) {
			throw new Error("City is required");
		}
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
