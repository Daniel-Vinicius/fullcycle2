import { UseCaseInterface } from "../../../@shared/usecase/usecase.interface";
import { ClientGateway } from "../../gateway/client.gateway";

import {
  FindClientInputDto,
  FindClientOutputDto,
} from "./find-client.usecase.dto";

export class FindClientUseCase implements UseCaseInterface {
  private _clientRepository: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this._clientRepository.find(input.id);

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
