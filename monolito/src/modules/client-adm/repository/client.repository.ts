import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Client } from "../domain/client.entity";
import { ClientGateway } from "../gateway/client.gateway";

import { ClientModel } from "./client.model";

function clientModelToEntity(clientModel: ClientModel) {
  return new Client({
    id: new Id(clientModel.id),
    name: clientModel.name,
    email: clientModel.email,
    address: clientModel.address,
    document: clientModel.document,
    createdAt: clientModel.createdAt,
    updatedAt: clientModel.updatedAt,
  });
}

export class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      document: client.document,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }

  async find(id: string): Promise<Client> {
    const client = await ClientModel.findOne({ where: { id } });

    if (!client) {
      throw new Error("Client not found.");
    }

    return clientModelToEntity(client);
  }
}
