import { deepFreeze } from "./object";

describe("Object Unit Tests", () => {
  it("should not freeze a scalar value", () => {
    const valueString = deepFreeze("a");
    expect(typeof valueString).toBe("string");

    const valueTrue = deepFreeze(true);
    expect(typeof valueTrue).toBe("boolean");

    const valueFalse = deepFreeze(false);
    expect(typeof valueFalse).toBe("boolean");

    const valueNumber = deepFreeze(5);
    expect(typeof valueNumber).toBe("number");
  });

  it("should be a immutable object", () => {
    const obj = deepFreeze({
      prop1: "value1",
      deep: { 
        prop2: "value2",
        prop3: new Date(),
      },
    });

    expect(() => (obj as any).prop1 = "test").toThrow();
    expect(() => (obj as any).deep.prop2 = "test").toThrow();
    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });
});