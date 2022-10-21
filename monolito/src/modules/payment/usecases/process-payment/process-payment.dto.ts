export interface ProcessPaymentInputDto {
  amount: number;
  orderId: string;
}

export interface ProcessPaymentOutputDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
