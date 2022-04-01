class Customer {
	private _id: string;
	private _name: string;
	private _address = "";
	private _active = false;

	constructor(id: string, name: string) {
		this._id = id;
		this._name = name;
		this.validate();
	}

	validate() {
		if (this._name.length === 0) {
			throw new Error("Name is required");
		}

		if (this._name.split(" ").length < 2) {
			throw new Error("Name must contain at least two words");
		}

		if (this._id.length === 0) {
			throw new Error("Id is required");
		}
	}

	changeName(name: string) {
		this._name = name;
		this.validate();
	}

	activate() {
		if (this._address.length === 0) {
			throw new Error("Address is mandatory to active a customer");
		}

		this._active = true;
	}

	deactivate() {
		this._active = false;
	}
}

const customer = new Customer("1", "John Doe");
customer.activate();
