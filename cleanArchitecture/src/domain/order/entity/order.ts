import { Entity } from "@domain/@shared/entity/entity.abstract";
import { OrderItem } from "./orderItem";

export class Order extends Entity {
	private context = "order";
	private _customerId: string;
	private _items: OrderItem[];

	constructor(id: string, customerId: string, items: OrderItem[]) {
		super(id);
		this._customerId = customerId;
		this._items = items;

		this.validate();
	}

	validate() {
		if (!this._id) {
			this.notification.addError({ message: "Id is required", context: this.context });
		}

		if (!this._customerId) {
			this.notification.addError({ message: "CustomerId is required", context: this.context });
		}

		if (this._items.length <= 0) {
			this.notification.addError({ message: "Order must have at least one item", context: this.context });
		}

		this.notification.throwErrorIfHasErrors();
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
			this.notification.addError({ message: "Item not found", context: this.context });
			this.notification.throwErrorIfHasErrors();
		}

		this._items.splice(itemIndex, 1);
	}
}
