export interface ValidatorInterface<T> {
	validate(entity: T): void;
}
