import { EventInterface } from "./event.interface";

export interface EventHandlerInterface<T extends EventInterface=EventInterface> {
  handle(event: T): void;
}
