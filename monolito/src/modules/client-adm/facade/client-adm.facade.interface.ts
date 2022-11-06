export interface AddClientFacadeInputDto {
  id?: string;
  name: string;
  email: string;
  address: string;
  document: string;
}

export interface FindClientFacadeInputDto {
  id: string;
}

export interface FindClientFacadeOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
  document: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<void>;
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}
