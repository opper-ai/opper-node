import { stringify, URLBuilder, OpperMediaHandler, BASE_PATHS } from "../utils";

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

    describe("OpperMediaHandler", () => {
        it("should throw an error for unsupported file types", () => {
            expect(() => new OpperMediaHandler("test.txt")).toThrow("Unsupported file format");
        });
        it("should return the correct mime type", () => {
            const mediaHandler = new OpperMediaHandler("test.jpg");
            // @ts-expect-error Testing protected method
            expect(mediaHandler.mimeType).toBe("image/jpeg");
        });
        it("should return the correct file extension", () => {
            const mediaHandler = new OpperMediaHandler("test.jpg");
            // @ts-expect-error Testing protected method
            expect(mediaHandler.fileExtension).toBe("jpg");
        });
    });

    describe("BASE_PATHS", () => {
        it("should be correct", () => {
            expect(BASE_PATHS).toStrictEqual({
                SPANS: "/v1/spans",
                TRACES: "/v1/traces",
                INDEXES: "/v1/indexes",
                CHAT: "/v1/chat",
                CALL: "/v1/call",
                FUNCTIONS: "/api/v1/functions",
                GENERATE_IMAGE: "/v1/generate-image",
                DATASETS: "/v1/datasets",
            });
        });
    });

    describe("URLBuilder", () => {
        it("should build a base URL", () => {
            const urlBuilder = new URLBuilder("https://api.opper.ai");
            expect(urlBuilder.buildURL(BASE_PATHS.DATASETS)).toBe(
                "https://api.opper.ai/v1/datasets"
            );
        });

        it("should build a resource URL", () => {
            const urlBuilder = new URLBuilder("https://api.opper.ai");
            expect(urlBuilder.buildResourceURL(BASE_PATHS.DATASETS, "123")).toBe(
                "https://api.opper.ai/v1/datasets/123"
            );
        });
    });
});
