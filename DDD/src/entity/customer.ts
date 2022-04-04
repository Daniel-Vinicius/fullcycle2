import { Address } from "./address";

class Customer {
	private _id: string;
	private _name: string;
	private _address?: Address;
	private _active = false;

	constructor(id: string, name: string) {
		this._id = id;
		this._name = name;
		this.validate();
	}

	validate() {
		if (!this._name) {
			throw new Error("Name is required");
		}

		if (this._name.split(" ").length < 2) {
			throw new Error("Name must contain at least two words");
		}

		if (!this._id) {
			throw new Error("Id is required");
		}
	}

	changeName(name: string) {
		this._name = name;
		this.validate();
	}

	activate() {
		if (!this._address) {
			throw new Error("Address is mandatory to active a customer");
		}

		this._active = true;
	}

	deactivate() {
		this._active = false;
	}

	setAddress(address: Address) {
		this._address = address;
		this._address.validate();
	}

	getAddress(): Address | null {
		return this._address ?? null;
	}
}

// const john = new Customer("1", "John Doe");
// const robert = new Customer("2", "Robert Doe");

// const address = new Address("Wilkie Way", 4290, 94306, "Palo Alto, CA");

// john.setAddress(address);

// john.activate();

// console.log(john.getAddress()?.toString());
// console.log(robert.getAddress()?.toString());
