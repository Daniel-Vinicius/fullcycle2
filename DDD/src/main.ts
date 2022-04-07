import { Address } from "./entity/customer/address";
import { Customer } from "./entity/customer";

import { OrderItem } from "./entity/order/orderItem";
import { Order } from "./entity/order";

const customer = new Customer("1", "John Doe");
const address = new Address("Wilkie Way", 4290, 94306, "Palo Alto, CA");

customer.setAddress(address);
customer.activate();

const item1 = new OrderItem("1", "product-1", "Shirt", 99.99, 2);
const item2 = new OrderItem("2", "product-2", "Shoes", 199.99, 1);

const order = new Order("1", customer.id, [item1, item2]);

console.log(customer);
console.log(order);
