import { Transaction } from "../domain/transaction";

export interface PaymentGateway {
  save(input: Transaction): Promise<Transaction>;
}
