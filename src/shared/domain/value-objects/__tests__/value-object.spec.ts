import ValueObject from "../value-object";

class StubValueObject extends ValueObject {}
describe('ValueObject Unit Tests', () => {
  it('should set value', () => {
    const valueObject1 = new StubValueObject('string value1');
    expect(valueObject1.value).toBe('string value1');

    const valueObject2 = new StubValueObject({prop: 'string value2'});
    expect(valueObject2.value).toStrictEqual({prop: 'string value2'});
  });

  it('should convert to a string', () => {
    const date = new Date();
    const arrange = [
      {received: null, expected: "null"},
      {received: undefined, expected: "undefined"},
      {received: "", expected: ""},
      {received: "fake test", expected: "fake test"},
      {received: 0, expected: "0"},
      {received: 1, expected: "1"},
      {received: 5, expected: "5"},
      {received: true, expected: "true"},
      {received: false, expected: "false"},
      {received: date, expected: date.toString()},
      {
        received: {prop: 'porpertie value'},
        expected: JSON.stringify({prop: 'porpertie value'})},
    ];
    arrange.forEach(value => {
      const valueObject = new StubValueObject(value.received);
      expect(valueObject + "").toBe(value.expected);
    });
  });

  it("should be a immutable object", () => {
    const obj = {
      prop1: "value1",
      deep: { 
        prop2: "value2",
        prop3: new Date()
      },
    };

    const valueObject = new StubValueObject(obj);

    expect(() => (valueObject as any).value.prop1 = "test").toThrow();
    expect(() => (valueObject as any).value.deep.prop2 = "test").toThrow();
    expect(valueObject.value.deep.prop3).toBeInstanceOf(Date);
  });
});