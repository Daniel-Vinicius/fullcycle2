import crypto from "crypto";

import { Customer } from "../entity/customer";
import { Address } from "../valueObject/address";

interface CreateCustomerInterface {
	name: string;

	address?: {
		street: string;
		number: number;
		zip: string;
		city: string;
	}
}

export class CustomerFactory {
	public static create(data: CreateCustomerInterface): Customer {
		const uuid = crypto.randomUUID();
		const { name, address } = data;

		if (address) {
			const { street, number, zip, city } = address;

			const addressOfCustomer = new Address(street, number, zip, city);
			const customer = new Customer(uuid, name);
			customer.setAddress(addressOfCustomer);

			return customer;
		}

		return new Customer(uuid, name);
	}
}
