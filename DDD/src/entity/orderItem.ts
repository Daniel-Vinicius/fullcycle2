export class OrderItem {
	private _id: string;
	private _name: string;
	private _price: number;

	constructor(id: string, name: string, price: number) {
		this._id = id;
		this._name = name;
		this._price = price;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get price() {
		return this._price;
	}
}