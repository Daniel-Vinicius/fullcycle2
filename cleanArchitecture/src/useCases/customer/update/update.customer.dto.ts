export interface InputUpdateCustomerDto {
  id: number;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}

export interface OutputUpdateCustomerDto {
  id: number;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}
