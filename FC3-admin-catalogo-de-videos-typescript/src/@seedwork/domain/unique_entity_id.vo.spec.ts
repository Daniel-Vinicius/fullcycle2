import { InvalidUuidError } from "@seedwork/errors/invalid_uuid.error";
import { UniqueEntityId } from "./unique_entity_id.vo";

describe("UniqueEntityId Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });
});
