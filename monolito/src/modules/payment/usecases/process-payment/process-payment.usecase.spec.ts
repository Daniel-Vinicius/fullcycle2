import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../../domain/transaction";
import { ProcessPaymentUseCase } from "./process-payment.usecase";

describe("ProcessPaymentUseCase unit test", () => {
  it("should approve a transaction", async () => {
    const transaction = new Transaction({
      id: new Id("1"),
      amount: 100,
      orderId: "1",
    });

    const MockRepository = () => {
      return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
      };
    };

    const paymentRepository = MockRepository();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 100,
    };

    const result = await usecase.execute(input);

    expect(result.transactionId).toEqual(transaction.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toEqual("approved");
    expect(result.amount).toEqual(100);
    expect(result.orderId).toEqual("1");
    expect(result.createdAt).toEqual(transaction.createdAt);
    expect(result.updatedAt).toEqual(transaction.updatedAt);
  });

  it("should decline a transaction", async () => {
    const transaction = new Transaction({
      id: new Id("1"),
      amount: 50,
      orderId: "1",
    });

    const MockRepository = () => {
      return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
      };
    };

    const paymentRepository = MockRepository();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 50,
    };

    const result = await usecase.execute(input);

    expect(result.transactionId).toEqual(transaction.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toEqual("declined");
    expect(result.amount).toEqual(50);
    expect(result.orderId).toEqual("1");
    expect(result.createdAt).toEqual(transaction.createdAt);
    expect(result.updatedAt).toEqual(transaction.updatedAt);
  });
});
