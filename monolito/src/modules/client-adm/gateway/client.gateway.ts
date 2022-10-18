import { Client } from "../domain/client.entity";

export interface ClientGateway {
  add(client: Client): Promise<void>;
  find(id: string): Promise<Client>;
}
