import { UseCaseInterface } from "../../@shared/usecase/usecase.interface";
import {
  PaymentFacadeInputDto,
  PaymentFacadeInterface,
  PaymentFacadeOutputDto,
} from "./facade.interface";

export class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentUseCase: UseCaseInterface) {}

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return await this.processPaymentUseCase.execute(input);
  }
}
