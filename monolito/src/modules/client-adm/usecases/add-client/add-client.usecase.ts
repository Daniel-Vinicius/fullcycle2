import { UseCaseInterface } from "../../../@shared/usecase/usecase.interface";
import { ClientGateway } from "../../gateway/client.gateway";
import {
  AddClientInputDto,
  AddClientOutputDto,
} from "./add-client.usecase.dto";

import { Client } from "../../domain/client.entity";
import { Id } from "../../../@shared/domain/value-object/id.value-object";

export class AddClientUseCase implements UseCaseInterface {
  private _clientRepository: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const client = new Client({
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      address: input.address,
      document: input.document,
    });

    await this._clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      document: client.document,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
