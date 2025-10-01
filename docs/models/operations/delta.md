# Delta

Incremental content for streaming. Used for both unstructured text streaming (when no output_schema) and structured streaming (when output_schema is provided). For structured streaming, contains actual field values being streamed to the json_path location. Supports all JSON types: strings, numbers, booleans.


## Supported Types

### `string`

```typescript
const value: string = "Hello";
```

### `number`

```typescript
const value: number = NaN;
```

### `number`

```typescript
const value: number = NaN;
```

### `boolean`

```typescript
const value: boolean = true;
```

