import { stringify } from "../utils";

describe("Utils", () => {
    describe("stringify", () => {
        it("should return undefined for undefined", () => {
            expect(stringify(undefined)).toBe(undefined);
        });
        it("should return 'null' for null", () => {
            expect(stringify(null)).toBe("null");
        });

        it("should return JSON string for simple objects", () => {
            expect(stringify({ a: 1, b: "test" })).toBe('{"a":1,"b":"test"}');
        });

        it("should return JSON string for arrays", () => {
            expect(stringify([1, 2, 3])).toBe("[1,2,3]");
        });

        it("should return string representation for numbers", () => {
            expect(stringify(42)).toBe("42");
            expect(stringify(3.14)).toBe("3.14");
        });

        it("should return string representation for booleans", () => {
            expect(stringify(true)).toBe("true");
            expect(stringify(false)).toBe("false");
        });

        it("should return string in quotes for strings", () => {
            expect(stringify("hello")).toBe('"hello"');
        });

        it("should handle nested objects", () => {
            const nestedObj = { a: { b: { c: 1 } } };
            expect(stringify(nestedObj)).toBe('{"a":{"b":{"c":1}}}');
        });

        it("should handle circular references", () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const circularObj: any = { a: 1 };
            circularObj.self = circularObj;
            expect(stringify(circularObj)).toBe("[Circular]");
        });

        it("should handle functions", () => {
            const func = () => "test";
            expect(stringify(func)).toBe(undefined);
        });

        it("should handle symbols", () => {
            const sym = Symbol("test");
            expect(stringify(sym)).toBe(undefined);
        });

        it("should handle BigInt", () => {
            const bigInt = BigInt(9007199254740991);
            expect(stringify(bigInt)).toBe("9007199254740991");
        });

        it("should handle Date objects", () => {
            const date = new Date("2023-05-17T12:00:00Z");
            expect(stringify(date)).toBe('"2023-05-17T12:00:00.000Z"');
        });
    });
});
