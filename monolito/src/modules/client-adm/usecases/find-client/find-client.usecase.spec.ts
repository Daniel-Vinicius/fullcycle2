import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Client } from "../../domain/client.entity";

import { FindClientUseCase } from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "client1@email.com",
  address: "Client 1 Address",
  document: "0000",
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
};

describe("FindClientUseCase unit test", () => {
  it("should find a client", async () => {
    const repository = MockRepository();
    const findClientUseCase = new FindClientUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await findClientUseCase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);
    expect(result.document).toEqual(client.document);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});
