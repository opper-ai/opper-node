# EvaluationConfig

Configuration for evaluation features stored under 'beta.evaluation'.

- enabled: master switch
- scorers: which evaluators to run. Accepts:
    - string: "base" | "rubrics"
    - dict: { "rubrics": RubricDefinition-like payload }
    - list[str | dict]
  "base" is the default scorer.

## Example Usage

```typescript
import { EvaluationConfig } from "opperai/models";

let value: EvaluationConfig = {};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `enabled`                                                        | *boolean*                                                        | :heavy_minus_sign:                                               | Enable evaluation features (base or rubrics).                    |
| `scorers`                                                        | *models.ScorersUnion2*                                           | :heavy_minus_sign:                                               | Evaluation scorers to run: 'base', 'rubrics', or a list of them. |
| `additionalProperties`                                           | Record<string, *any*>                                            | :heavy_minus_sign:                                               | N/A                                                              |