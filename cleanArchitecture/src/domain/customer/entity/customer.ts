import { Address } from "@domain/customer/valueObject/address";

export class Customer {
	private _id: string;
	private _name: string;
	private _address?: Address;
	private _active = false;
	private _rewardPoints = 0;

	constructor(id: string, name: string) {
		this._id = id;
		this._name = name;
		this.validate();
	}

	validate() {
		if (!this._id) {
			throw new Error("Id is required");
		}

		if (!this._name) {
			throw new Error("Name is required");
		}

		if (this._name.split(" ").length < 2) {
			throw new Error("Name must contain at least two words");
		}

		if (this._rewardPoints < 0) {
			throw new Error("Reward points must be greater than or equal to zero");
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

	addRewardPoints(points: number) {
		if (points < 0) {
			throw new Error("Points must be positive");
		}

		this._rewardPoints += points;
	}

	get id() {
		return this._id;
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
