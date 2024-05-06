import { AsyncLocalStorage } from "async_hooks";

interface SpanContext {
    spanId?: string;
}

export const spanContextStorage = new AsyncLocalStorage<SpanContext>();

export function getCurrentSpanId(): string | undefined {
    const context = spanContextStorage.getStore();
    return context?.spanId;
}
