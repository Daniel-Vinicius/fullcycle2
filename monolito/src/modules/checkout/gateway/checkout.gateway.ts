import { Order } from "../domain/order.entity";

export interface CheckoutGateway {
  addOrder(order: Order): Promise<Order>;
  findOrder(id: string): Promise<Order | null>;
}
