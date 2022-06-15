import { Entity } from "@domain/@shared/entity/entity.abstract";
import { Address } from "@domain/customer/valueObject/address";

export class Customer extends Entity {
	private context = "customer";
	private _name: string;
	private _address?: Address;
	private _active = false;
	private _rewardPoints = 0;

	constructor(id: string, name: string) {
		super(id);
		this._name = name;
		this.validate();
	}

	private nameHasLessThanTwoWords() {
		const words = this._name.split(" ");
		return words.length < 2;
	}

	validate() {
		if (!this.id) {
			this.notification.addError({ context: this.context, message: "Id is required" });
		}

		if (!this._name) {
			this.notification.addError({ context: this.context, message: "Name is required" });
		}

		if (this.nameHasLessThanTwoWords()) {
			this.notification.addError({ context: this.context, message: "Name must contain at least two words" });
		}

		if (this._rewardPoints < 0) {
			this.notification.addError({ context: this.context, message: "Reward points must be greater than or equal to zero" });
		}

		this.notification.throwErrorIfHasErrors();
	}

	changeName(name: string) {
		this._name = name;
		this.validate();
	}

	activate() {
		if (!this._address) {
			this.notification.addError({ context: "customer - activate", message: "Address is mandatory to active a customer" });
			this.notification.throwErrorIfHasErrors();
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

	addRewardPoints(points: number) {
		if (points < 0) {
			this.notification.addError({ context: "customer - addRewardPoints", message: "Points must be positive" });
			this.notification.throwErrorIfHasErrors();
		}

		this._rewardPoints += points;
	}

	get name() {
		return this._name;
	}

	get active() {
		return this._active;
	}

	get rewardPoints() {
		return this._rewardPoints;
	}
}
