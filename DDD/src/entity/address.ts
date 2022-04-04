export class Address {
  
	// private attributes

	_street: string;
	_number: number;
	_zip: number;
	_city: string;

	constructor(street: string, number: number, zip: number, city: string) {

		this._street = street;
		this._number = number;
		this._zip = zip;
		this._city = city;

		this.validate();
	}

	validate() {
		if (!this._street) {
			console.log(this._street);
			throw new Error("Street is required");
		}

		if (!this._number) {
			throw new Error("Number is required");
		}

		if (!this._city) {
			throw new Error("City is required");
		}

		if (!this._zip) {
			throw new Error("Zip is required");
		}
	}

	toString() {
		return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
	}
}
