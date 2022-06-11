export interface ProductInterface {
  get id(): string;
  get name(): string;
  get price(): number;
  validate(): void;
  changeName(name: string): void;
  changePrice(price: number): void;
  applyDiscount(discountPercentage: number): void;
}
