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
		const total = this._items.reduce((acc, item) => acc += item.getPriceOfOrderItem(), 0);
		const totalWithTwoDecimals = total.toFixed(2);
		return Number(totalWithTwoDecimals);
	}

	addItem(item: OrderItem) {
		item.validate();
		this._items.push(item);
	}

	removeItem(itemId: string) {
		const itemIndex = this._items.findIndex(item => item.id === itemId);
		const itemExists = itemIndex !== -1 && itemIndex >= 0;

		if (!itemExists) {
			throw new Error("Item not found");
		}

		this._items.splice(itemIndex, 1);
	}
}
