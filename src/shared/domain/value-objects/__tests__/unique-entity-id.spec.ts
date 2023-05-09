import InvalidUuidError from "../../../../shared/errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id";
import {v4 as uuidv4, validate as uuidv4Validate} from 'uuid';

describe("UniqueEntityId unit tests", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

  beforeEach(() => validateSpy.mockClear());

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId('Fake Id')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = uuidv4();
    const valueObject = new UniqueEntityId(uuid);
    expect(valueObject.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should generate uuid valid in constructor ", () => {
    const valueObject = new UniqueEntityId();
    expect(uuidv4Validate(valueObject.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});