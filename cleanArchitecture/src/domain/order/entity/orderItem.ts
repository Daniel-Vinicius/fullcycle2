import { Entity } from "@domain/@shared/entity/entity.abstract";

export class OrderItem extends Entity {
	private context = "orderItem";
	private _productId: string;
	private _name: string;
	private _unitPrice: number;
	private _quantity: number;

	constructor(id: string, productId: string, name: string, unitPrice: number, quantity: number) {
		super(id);
		this._productId = productId;
		this._name = name;
		this._unitPrice = unitPrice;
		this._quantity = quantity;

		this.validate();
	}

	validate() {
		if (!this._id) {
			this.notification.addError({ message: "Id is required", context: this.context });
		}

		if (!this._productId) {
			this.notification.addError({ message: "ProductId is required", context: this.context });
		}

		if (!this._name) {
			this.notification.addError({ message: "Name is required", context: this.context });
		}

		if (this._unitPrice <= 0) {
			this.notification.addError({ message: "Price must be greater than zero", context: this.context });
		}

		if (this._quantity <= 0) {
			this.notification.addError({ message: "Quantity must be greater than zero", context: this.context });
		}

		this.notification.throwErrorIfHasErrors();
	}

	get productId() {
		return this._productId;
	}

	get name() {
		return this._name;
	}

	getPriceOfOrderItem() {
		return this._unitPrice * this._quantity;
	}

	get quantity() {
		return this._quantity;
	}

	get unitPrice() {
		return this._unitPrice;
	}
}
