import { AddClientUseCase } from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("AddClientUseCase unit test", () => {
  it("should add a client", async () => {
    const repository = MockRepository();
    const addClientUseCase = new AddClientUseCase(repository);

    const input = {
      name: "John Doe",
      email: "jdoe@example.com",
      address: "Address 1",
      document: "0000",
    };

    const result = await addClientUseCase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.address).toEqual(input.address);
  });
});
