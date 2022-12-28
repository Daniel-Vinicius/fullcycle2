import { validate as uuidValidate } from "uuid";
import { InvalidUuidError } from "@seedwork/errors/invalid_uuid.error";
import { UniqueEntityId } from "./unique_entity_id.vo";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityId Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const validateSpy = spyValidateMethod();
    const uuid = "6be7293a-7cd3-49f2-8136-0a6c66d1a8f7";
    const valueObject = new UniqueEntityId(uuid);
    expect(valueObject.id).toEqual(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should generate a uuid when nothing is passed", () => {
    const validateSpy = spyValidateMethod();
    const valueObject = new UniqueEntityId();
    expect(uuidValidate(valueObject.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
