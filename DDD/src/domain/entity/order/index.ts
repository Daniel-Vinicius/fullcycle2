import { OrderItem } from "./orderItem";

export class Order {
	private _id: string;
	private _customerId: string;
	private _items: OrderItem[];

	constructor(id: string, customerId: string, items: OrderItem[]) {
		this._id = id;
		this._customerId = customerId;
		this._items = items;

		this.validate();
	}

	validate() {
		if (!this._id) {
			throw new Error("Id is required");
		}

		if (!this._customerId) {
			throw new Error("CustomerId is required");
		}

		if (this._items.length <= 0) {
			throw new Error("Order must have at least one item");
		}
	}

	get id() {
		return this._id;
	}

	get customerId() {
		return this._customerId;
	}

	get items() {
		return this._items;
	}

	total(): number {
		return this._items.reduce((acc, item) => acc += item.getPriceOfOrderItem(), 0);
	}
}
