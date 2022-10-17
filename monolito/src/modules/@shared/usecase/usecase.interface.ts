export interface UseCaseInterface {
  execute(input: any): Promise<any>;
}
