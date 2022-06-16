import { Entity } from "@domain/@shared/entity/entity.abstract";
import { Address } from "@domain/customer/valueObject/address";
import { CustomerValidatorFactory } from "../factory/customer.validator.factory";

export class Customer extends Entity {
	private _name: string;
	private _address?: Address;
	private _active = false;
	private _rewardPoints = 0;

	constructor(id: string, name: string) {
		super(id);
		this._name = name;

		this.validate();
	}

	validate() {
		const customerValidator = CustomerValidatorFactory.create();
		customerValidator.validate(this);
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
