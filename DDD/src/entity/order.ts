import { OrderItem } from "./orderItem";

export class Order {
	private _id: string;
	private _customerId: string;
	private _items: OrderItem[];

	constructor(id: string, customerId: string, items: OrderItem[]) {
		this._id = id;
		this._customerId = customerId;
		this._items = items;
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
		return this._items.reduce((acc, item) => acc + item.price, 0);
	}
}
