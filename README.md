# opperai

Developer-friendly & type-safe Typescript SDK specifically catered to leverage *opperai* API.

<div align="left">
    <a href="https://www.speakeasy.com/?utm_source=opperai&utm_campaign=typescript"><img src="https://custom-icon-badges.demolab.com/badge/-Built%20By%20Speakeasy-212015?style=for-the-badge&logoColor=FBE331&logo=speakeasy&labelColor=545454" /></a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" style="width: 100px; height: 28px;" />
    </a>
</div>


<br /><br />

<!-- Start Summary [summary] -->
## Summary


<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [opperai](#opperai)
  * [SDK Installation](#sdk-installation)
  * [Requirements](#requirements)
  * [SDK Example Usage](#sdk-example-usage)
  * [Authentication](#authentication)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Standalone functions](#standalone-functions)
  * [Server-sent event streaming](#server-sent-event-streaming)
  * [Retries](#retries)
  * [Error Handling](#error-handling)
  * [Server Selection](#server-selection)
  * [Custom HTTP Client](#custom-http-client)
  * [Debugging](#debugging)
* [Development](#development)
  * [Maturity](#maturity)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

> [!TIP]
> To finish publishing your SDK to npm and others you must [run your first generation action](https://www.speakeasy.com/docs/github-setup#step-by-step-guide).


The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add <UNSET>
```

### PNPM

```bash
pnpm add <UNSET>
```

### Bun

```bash
bun add <UNSET>
```

### Yarn

```bash
yarn add <UNSET> zod

# Note that Yarn does not install peer dependencies automatically. You will need
# to install zod as shown above.
```

> [!NOTE]
> This package is published with CommonJS and ES Modules (ESM) support.


### Model Context Protocol (MCP) Server

This SDK is also an installable MCP server where the various SDK methods are
exposed as tools that can be invoked by AI applications.

> Node.js v20 or greater is required to run the MCP server from npm.

<details>
<summary>Claude installation steps</summary>

Add the following server definition to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "Opper": {
      "command": "npx",
      "args": [
        "-y", "--package", "opperai",
        "--",
        "mcp", "start",
        "--http-bearer", "..."
      ]
    }
  }
}
```

</details>

<details>
<summary>Cursor installation steps</summary>

Create a `.cursor/mcp.json` file in your project root with the following content:

```json
{
  "mcpServers": {
    "Opper": {
      "command": "npx",
      "args": [
        "-y", "--package", "opperai",
        "--",
        "mcp", "start",
        "--http-bearer", "..."
      ]
    }
  }
}
```

</details>

You can also run MCP servers as a standalone binary with no additional dependencies. You must pull these binaries from available Github releases:

```bash
curl -L -o mcp-server \
    https://github.com/{org}/{repo}/releases/download/{tag}/mcp-server-bun-darwin-arm64 && \
chmod +x mcp-server
```

If the repo is a private repo you must add your Github PAT to download a release `-H "Authorization: Bearer {GITHUB_PAT}"`.


```json
{
  "mcpServers": {
    "Todos": {
      "command": "./DOWNLOAD/PATH/mcp-server",
      "args": [
        "start"
      ]
    }
  }
}
```

For a full list of server arguments, run:

```sh
npx -y --package opperai -- mcp start --help
```
<!-- End SDK Installation [installation] -->

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.call({
    name: "add_numbers",
    instructions: "Calculate the sum of two numbers",
    inputSchema: {
      "properties": {
        "x": {
          "title": "X",
          "type": "integer",
        },
        "y": {
          "title": "Y",
          "type": "integer",
        },
      },
      "required": [
        "x",
        "y",
      ],
      "title": "OpperInputExample",
      "type": "object",
    },
    outputSchema: {
      "properties": {
        "sum": {
          "title": "Sum",
          "type": "integer",
        },
      },
      "required": [
        "sum",
      ],
      "title": "OpperOutputExample",
      "type": "object",
    },
    input: {
      "x": 4,
      "y": 5,
    },
    examples: [
      {
        input: {
          "x": 1,
          "y": 3,
        },
        output: {
          "sum": 4,
        },
        comment: "Adds two numbers",
      },
    ],
    parentSpanId: "123e4567-e89b-12d3-a456-426614174000",
    tags: {
      "project": "project_456",
      "user": "company_123",
    },
    configuration: {},
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name         | Type | Scheme      | Environment Variable |
| ------------ | ---- | ----------- | -------------------- |
| `httpBearer` | http | HTTP Bearer | `OPPER_HTTP_BEARER`  |

To authenticate with the API the `httpBearer` parameter must be set when initializing the SDK client instance. For example:
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.call({
    name: "add_numbers",
    instructions: "Calculate the sum of two numbers",
    inputSchema: {
      "properties": {
        "x": {
          "title": "X",
          "type": "integer",
        },
        "y": {
          "title": "Y",
          "type": "integer",
        },
      },
      "required": [
        "x",
        "y",
      ],
      "title": "OpperInputExample",
      "type": "object",
    },
    outputSchema: {
      "properties": {
        "sum": {
          "title": "Sum",
          "type": "integer",
        },
      },
      "required": [
        "sum",
      ],
      "title": "OpperOutputExample",
      "type": "object",
    },
    input: {
      "x": 4,
      "y": 5,
    },
    examples: [
      {
        input: {
          "x": 1,
          "y": 3,
        },
        output: {
          "sum": 4,
        },
        comment: "Adds two numbers",
      },
    ],
    parentSpanId: "123e4567-e89b-12d3-a456-426614174000",
    tags: {
      "project": "project_456",
      "user": "company_123",
    },
    configuration: {},
  });

  console.log(result);
}

run();

```
<!-- End Authentication [security] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

<details open>
<summary>Available methods</summary>

### [analytics](docs/sdks/analytics/README.md)

* [getUsage](docs/sdks/analytics/README.md#getusage) - Usage

### [datasets](docs/sdks/datasets/README.md)

* [createEntry](docs/sdks/datasets/README.md#createentry) - Create Dataset Entry
* [listEntries](docs/sdks/datasets/README.md#listentries) - List Dataset Entries
* [getEntry](docs/sdks/datasets/README.md#getentry) - Get Dataset Entry
* [deleteEntry](docs/sdks/datasets/README.md#deleteentry) - Delete Dataset Entry
* [queryEntries](docs/sdks/datasets/README.md#queryentries) - Query Dataset Entries

#### [datasets.entries](docs/sdks/entries/README.md)

* [update](docs/sdks/entries/README.md#update) - Update Dataset Entry

### [embeddings](docs/sdks/embeddings/README.md)

* [create](docs/sdks/embeddings/README.md#create) - Create Embedding

### [functions](docs/sdks/functions/README.md)

* [create](docs/sdks/functions/README.md#create) - Create Function
* [list](docs/sdks/functions/README.md#list) - List Functions
* [get](docs/sdks/functions/README.md#get) - Get Function
* [update](docs/sdks/functions/README.md#update) - Update Function
* [delete](docs/sdks/functions/README.md#delete) - Delete Function
* [getByName](docs/sdks/functions/README.md#getbyname) - Get Function By Name
* [getByRevision](docs/sdks/functions/README.md#getbyrevision) - Get Function By Revision
* [call](docs/sdks/functions/README.md#call) - Call Function
* [stream](docs/sdks/functions/README.md#stream) - Stream Function
* [callRevision](docs/sdks/functions/README.md#callrevision) - Call Function Revision
* [streamRevision](docs/sdks/functions/README.md#streamrevision) - Stream Function Revision

#### [functions.revisions](docs/sdks/revisions/README.md)

* [list](docs/sdks/revisions/README.md#list) - List Function Revisions

### [knowledge](docs/sdks/knowledge/README.md)

* [create](docs/sdks/knowledge/README.md#create) - Create Knowledge Base
* [list](docs/sdks/knowledge/README.md#list) - List Knowledge Bases
* [get](docs/sdks/knowledge/README.md#get) - Get Knowledge Base
* [delete](docs/sdks/knowledge/README.md#delete) - Delete Knowledge Base
* [getByName](docs/sdks/knowledge/README.md#getbyname) - Get Knowledge Base By Name
* [getUploadUrl](docs/sdks/knowledge/README.md#getuploadurl) - Get Upload Url
* [registerFileUpload](docs/sdks/knowledge/README.md#registerfileupload) - Register File Upload
* [deleteFile](docs/sdks/knowledge/README.md#deletefile) - Delete File From Knowledge Base
* [query](docs/sdks/knowledge/README.md#query) - Query Knowledge Base
* [addKnowledgeKnowledgeBaseIdAddPost](docs/sdks/knowledge/README.md#addknowledgeknowledgebaseidaddpost) - Add

### [languageModels](docs/sdks/languagemodels/README.md)

* [list](docs/sdks/languagemodels/README.md#list) - List Models
* [registerCustom](docs/sdks/languagemodels/README.md#registercustom) - Register Custom Model
* [listCustom](docs/sdks/languagemodels/README.md#listcustom) - List Custom Models
* [getCustom](docs/sdks/languagemodels/README.md#getcustom) - Get Custom Model
* [updateCustom](docs/sdks/languagemodels/README.md#updatecustom) - Update Custom Model
* [deleteCustom](docs/sdks/languagemodels/README.md#deletecustom) - Delete Custom Model
* [getCustomByName](docs/sdks/languagemodels/README.md#getcustombyname) - Get Custom Model By Name

### [openai](docs/sdks/openai/README.md)

* [createChatCompletion](docs/sdks/openai/README.md#createchatcompletion) - Chat Completions

### [Opper SDK](docs/sdks/opper/README.md)

* [call](docs/sdks/opper/README.md#call) - Function Call
* [stream](docs/sdks/opper/README.md#stream) - Function Stream

### [spanMetrics](docs/sdks/spanmetrics/README.md)

* [createMetric](docs/sdks/spanmetrics/README.md#createmetric) - Create Metric
* [list](docs/sdks/spanmetrics/README.md#list) - List Metrics
* [get](docs/sdks/spanmetrics/README.md#get) - Get Metric
* [updateMetric](docs/sdks/spanmetrics/README.md#updatemetric) - Update Metric
* [delete](docs/sdks/spanmetrics/README.md#delete) - Delete Metric

### [spans](docs/sdks/spans/README.md)

* [create](docs/sdks/spans/README.md#create) - Create Span
* [get](docs/sdks/spans/README.md#get) - Get Span
* [update](docs/sdks/spans/README.md#update) - Update Span
* [delete](docs/sdks/spans/README.md#delete) - Delete Span
* [saveExamples](docs/sdks/spans/README.md#saveexamples) - Save To Dataset

### [traces](docs/sdks/traces/README.md)

* [list](docs/sdks/traces/README.md#list) - List Traces
* [get](docs/sdks/traces/README.md#get) - Get Trace

</details>
<!-- End Available Resources and Operations [operations] -->

<!-- Start Standalone functions [standalone-funcs] -->
## Standalone functions

All the methods listed above are available as standalone functions. These
functions are ideal for use in applications running in the browser, serverless
runtimes or other environments where application bundle size is a primary
concern. When using a bundler to build your application, all unused
functionality will be either excluded from the final bundle or tree-shaken away.

To read more about standalone functions, check [FUNCTIONS.md](./FUNCTIONS.md).

<details>

<summary>Available standalone functions</summary>

- [`analyticsGetUsage`](docs/sdks/analytics/README.md#getusage) - Usage
- [`call`](docs/sdks/opper/README.md#call) - Function Call
- [`datasetsCreateEntry`](docs/sdks/datasets/README.md#createentry) - Create Dataset Entry
- [`datasetsDeleteEntry`](docs/sdks/datasets/README.md#deleteentry) - Delete Dataset Entry
- [`datasetsEntriesUpdate`](docs/sdks/entries/README.md#update) - Update Dataset Entry
- [`datasetsGetEntry`](docs/sdks/datasets/README.md#getentry) - Get Dataset Entry
- [`datasetsListEntries`](docs/sdks/datasets/README.md#listentries) - List Dataset Entries
- [`datasetsQueryEntries`](docs/sdks/datasets/README.md#queryentries) - Query Dataset Entries
- [`embeddingsCreate`](docs/sdks/embeddings/README.md#create) - Create Embedding
- [`functionsCall`](docs/sdks/functions/README.md#call) - Call Function
- [`functionsCallRevision`](docs/sdks/functions/README.md#callrevision) - Call Function Revision
- [`functionsCreate`](docs/sdks/functions/README.md#create) - Create Function
- [`functionsDelete`](docs/sdks/functions/README.md#delete) - Delete Function
- [`functionsGet`](docs/sdks/functions/README.md#get) - Get Function
- [`functionsGetByName`](docs/sdks/functions/README.md#getbyname) - Get Function By Name
- [`functionsGetByRevision`](docs/sdks/functions/README.md#getbyrevision) - Get Function By Revision
- [`functionsList`](docs/sdks/functions/README.md#list) - List Functions
- [`functionsRevisionsList`](docs/sdks/revisions/README.md#list) - List Function Revisions
- [`functionsStream`](docs/sdks/functions/README.md#stream) - Stream Function
- [`functionsStreamRevision`](docs/sdks/functions/README.md#streamrevision) - Stream Function Revision
- [`functionsUpdate`](docs/sdks/functions/README.md#update) - Update Function
- [`knowledgeAddKnowledgeKnowledgeBaseIdAddPost`](docs/sdks/knowledge/README.md#addknowledgeknowledgebaseidaddpost) - Add
- [`knowledgeCreate`](docs/sdks/knowledge/README.md#create) - Create Knowledge Base
- [`knowledgeDelete`](docs/sdks/knowledge/README.md#delete) - Delete Knowledge Base
- [`knowledgeDeleteFile`](docs/sdks/knowledge/README.md#deletefile) - Delete File From Knowledge Base
- [`knowledgeGet`](docs/sdks/knowledge/README.md#get) - Get Knowledge Base
- [`knowledgeGetByName`](docs/sdks/knowledge/README.md#getbyname) - Get Knowledge Base By Name
- [`knowledgeGetUploadUrl`](docs/sdks/knowledge/README.md#getuploadurl) - Get Upload Url
- [`knowledgeList`](docs/sdks/knowledge/README.md#list) - List Knowledge Bases
- [`knowledgeQuery`](docs/sdks/knowledge/README.md#query) - Query Knowledge Base
- [`knowledgeRegisterFileUpload`](docs/sdks/knowledge/README.md#registerfileupload) - Register File Upload
- [`languageModelsDeleteCustom`](docs/sdks/languagemodels/README.md#deletecustom) - Delete Custom Model
- [`languageModelsGetCustom`](docs/sdks/languagemodels/README.md#getcustom) - Get Custom Model
- [`languageModelsGetCustomByName`](docs/sdks/languagemodels/README.md#getcustombyname) - Get Custom Model By Name
- [`languageModelsList`](docs/sdks/languagemodels/README.md#list) - List Models
- [`languageModelsListCustom`](docs/sdks/languagemodels/README.md#listcustom) - List Custom Models
- [`languageModelsRegisterCustom`](docs/sdks/languagemodels/README.md#registercustom) - Register Custom Model
- [`languageModelsUpdateCustom`](docs/sdks/languagemodels/README.md#updatecustom) - Update Custom Model
- [`openaiCreateChatCompletion`](docs/sdks/openai/README.md#createchatcompletion) - Chat Completions
- [`spanMetricsCreateMetric`](docs/sdks/spanmetrics/README.md#createmetric) - Create Metric
- [`spanMetricsDelete`](docs/sdks/spanmetrics/README.md#delete) - Delete Metric
- [`spanMetricsGet`](docs/sdks/spanmetrics/README.md#get) - Get Metric
- [`spanMetricsList`](docs/sdks/spanmetrics/README.md#list) - List Metrics
- [`spanMetricsUpdateMetric`](docs/sdks/spanmetrics/README.md#updatemetric) - Update Metric
- [`spansCreate`](docs/sdks/spans/README.md#create) - Create Span
- [`spansDelete`](docs/sdks/spans/README.md#delete) - Delete Span
- [`spansGet`](docs/sdks/spans/README.md#get) - Get Span
- [`spansSaveExamples`](docs/sdks/spans/README.md#saveexamples) - Save To Dataset
- [`spansUpdate`](docs/sdks/spans/README.md#update) - Update Span
- [`stream`](docs/sdks/opper/README.md#stream) - Function Stream
- [`tracesGet`](docs/sdks/traces/README.md#get) - Get Trace
- [`tracesList`](docs/sdks/traces/README.md#list) - List Traces

</details>
<!-- End Standalone functions [standalone-funcs] -->

<!-- Start Server-sent event streaming [eventstream] -->
## Server-sent event streaming

[Server-sent events][mdn-sse] are used to stream content from certain
operations. These operations will expose the stream as an async iterable that
can be consumed using a [`for await...of`][mdn-for-await-of] loop. The loop will
terminate when the server no longer has any events to send and closes the
underlying connection.

```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.stream({
    name: "add_numbers",
    instructions: "Calculate the sum of two numbers",
    inputSchema: {
      "properties": {
        "x": {
          "title": "X",
          "type": "integer",
        },
        "y": {
          "title": "Y",
          "type": "integer",
        },
      },
      "required": [
        "x",
        "y",
      ],
      "title": "OpperInputExample",
      "type": "object",
    },
    outputSchema: {
      "properties": {
        "sum": {
          "title": "Sum",
          "type": "integer",
        },
      },
      "required": [
        "sum",
      ],
      "title": "OpperOutputExample",
      "type": "object",
    },
    input: {
      "x": 4,
      "y": 5,
    },
    examples: [
      {
        input: {
          "x": 1,
          "y": 3,
        },
        output: {
          "sum": 4,
        },
        comment: "Adds two numbers",
      },
    ],
    parentSpanId: "123e4567-e89b-12d3-a456-426614174000",
    tags: {
      "project": "project_456",
      "user": "company_123",
    },
  });

  for await (const event of result) {
    // Handle the event
    console.log(event);
  }
}

run();

```

[mdn-sse]: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
[mdn-for-await-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
<!-- End Server-sent event streaming [eventstream] -->

<!-- Start Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.call({
    name: "add_numbers",
    instructions: "Calculate the sum of two numbers",
    inputSchema: {
      "properties": {
        "x": {
          "title": "X",
          "type": "integer",
        },
        "y": {
          "title": "Y",
          "type": "integer",
        },
      },
      "required": [
        "x",
        "y",
      ],
      "title": "OpperInputExample",
      "type": "object",
    },
    outputSchema: {
      "properties": {
        "sum": {
          "title": "Sum",
          "type": "integer",
        },
      },
      "required": [
        "sum",
      ],
      "title": "OpperOutputExample",
      "type": "object",
    },
    input: {
      "x": 4,
      "y": 5,
    },
    examples: [
      {
        input: {
          "x": 1,
          "y": 3,
        },
        output: {
          "sum": 4,
        },
        comment: "Adds two numbers",
      },
    ],
    parentSpanId: "123e4567-e89b-12d3-a456-426614174000",
    tags: {
      "project": "project_456",
      "user": "company_123",
    },
    configuration: {},
  }, {
    retries: {
      strategy: "backoff",
      backoff: {
        initialInterval: 1,
        maxInterval: 50,
        exponent: 1.1,
        maxElapsedTime: 100,
      },
      retryConnectionErrors: false,
    },
  });

  console.log(result);
}

run();

```

If you'd like to override the default retry strategy for all operations that support retries, you can provide a retryConfig at SDK initialization:
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  retryConfig: {
    strategy: "backoff",
    backoff: {
      initialInterval: 1,
      maxInterval: 50,
      exponent: 1.1,
      maxElapsedTime: 100,
    },
    retryConnectionErrors: false,
  },
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.call({
    name: "add_numbers",
    instructions: "Calculate the sum of two numbers",
    inputSchema: {
      "properties": {
        "x": {
          "title": "X",
          "type": "integer",
        },
        "y": {
          "title": "Y",
          "type": "integer",
        },
      },
      "required": [
        "x",
        "y",
      ],
      "title": "OpperInputExample",
      "type": "object",
    },
    outputSchema: {
      "properties": {
        "sum": {
          "title": "Sum",
          "type": "integer",
        },
      },
      "required": [
        "sum",
      ],
      "title": "OpperOutputExample",
      "type": "object",
    },
    input: {
      "x": 4,
      "y": 5,
    },
    examples: [
      {
        input: {
          "x": 1,
          "y": 3,
        },
        output: {
          "sum": 4,
        },
        comment: "Adds two numbers",
      },
    ],
    parentSpanId: "123e4567-e89b-12d3-a456-426614174000",
    tags: {
      "project": "project_456",
      "user": "company_123",
    },
    configuration: {},
  });

  console.log(result);
}

run();

```
<!-- End Retries [retries] -->

<!-- Start Error Handling [errors] -->
## Error Handling

[`OpperError`](./src/models/errors/oppererror.ts) is the base class for all HTTP error responses. It has the following properties:

| Property            | Type       | Description                                                                             |
| ------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `error.message`     | `string`   | Error message                                                                           |
| `error.statusCode`  | `number`   | HTTP response status code eg `404`                                                      |
| `error.headers`     | `Headers`  | HTTP response headers                                                                   |
| `error.body`        | `string`   | HTTP body. Can be empty string if no body is returned.                                  |
| `error.rawResponse` | `Response` | Raw HTTP response                                                                       |
| `error.data$`       |            | Optional. Some errors may contain structured data. [See Error Classes](#error-classes). |

### Example
```typescript
import { Opper } from "opperai";
import * as errors from "opperai/models/errors";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  try {
    const result = await opper.call({
      name: "add_numbers",
      instructions: "Calculate the sum of two numbers",
      inputSchema: {
        "properties": {
          "x": {
            "title": "X",
            "type": "integer",
          },
          "y": {
            "title": "Y",
            "type": "integer",
          },
        },
        "required": [
          "x",
          "y",
        ],
        "title": "OpperInputExample",
        "type": "object",
      },
      outputSchema: {
        "properties": {
          "sum": {
            "title": "Sum",
            "type": "integer",
          },
        },
        "required": [
          "sum",
        ],
        "title": "OpperOutputExample",
        "type": "object",
      },
      input: {
        "x": 4,
        "y": 5,
      },
      examples: [
        {
          input: {
            "x": 1,
            "y": 3,
          },
          output: {
            "sum": 4,
          },
          comment: "Adds two numbers",
        },
      ],
      parentSpanId: "123e4567-e89b-12d3-a456-426614174000",
      tags: {
        "project": "project_456",
        "user": "company_123",
      },
      configuration: {},
    });

    console.log(result);
  } catch (error) {
    // The base class for HTTP error responses
    if (error instanceof errors.OpperError) {
      console.log(error.message);
      console.log(error.statusCode);
      console.log(error.body);
      console.log(error.headers);

      // Depending on the method different errors may be thrown
      if (error instanceof errors.BadRequestError) {
        console.log(error.data$.type); // string
        console.log(error.data$.message); // string
        console.log(error.data$.detail); // any
      }
    }
  }
}

run();

```

### Error Classes
**Primary errors:**
* [`OpperError`](./src/models/errors/oppererror.ts): The base class for HTTP error responses.
  * [`BadRequestError`](docs/models/errors/badrequesterror.md): Bad Request. Status code `400`.
  * [`UnauthorizedError`](docs/models/errors/unauthorizederror.md): Unauthorized. Status code `401`.
  * [`NotFoundError`](docs/models/errors/notfounderror.md): Not Found. Status code `404`.
  * [`RequestValidationError`](docs/models/errors/requestvalidationerror.md): Request Validation Error. Status code `422`. *

<details><summary>Less common errors (8)</summary>

<br />

**Network errors:**
* [`ConnectionError`](./src/models/errors/httpclienterrors.ts): HTTP client was unable to make a request to a server.
* [`RequestTimeoutError`](./src/models/errors/httpclienterrors.ts): HTTP request timed out due to an AbortSignal signal.
* [`RequestAbortedError`](./src/models/errors/httpclienterrors.ts): HTTP request was aborted by the client.
* [`InvalidRequestError`](./src/models/errors/httpclienterrors.ts): Any input used to create a request is invalid.
* [`UnexpectedClientError`](./src/models/errors/httpclienterrors.ts): Unrecognised or unexpected error.


**Inherit from [`OpperError`](./src/models/errors/oppererror.ts)**:
* [`ConflictError`](docs/models/errors/conflicterror.md): Conflict. Status code `409`. Applicable to 3 of 52 methods.*
* [`ErrorT`](docs/models/errors/errort.md): Request validation error. Applicable to 1 of 52 methods.*
* [`ResponseValidationError`](./src/models/errors/responsevalidationerror.ts): Type mismatch between the data returned from the server and the structure expected by the SDK. See `error.rawValue` for the raw value and `error.pretty()` for a nicely formatted multi-line string.

</details>

\* Check [the method documentation](#available-resources-and-operations) to see if the error is applicable.
<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->
## Server Selection

### Override Server URL Per-Client

The default server can be overridden globally by passing a URL to the `serverURL: string` optional parameter when initializing the SDK client instance. For example:
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  serverURL: "https://api.opper.ai/v2",
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.call({
    name: "add_numbers",
    instructions: "Calculate the sum of two numbers",
    inputSchema: {
      "properties": {
        "x": {
          "title": "X",
          "type": "integer",
        },
        "y": {
          "title": "Y",
          "type": "integer",
        },
      },
      "required": [
        "x",
        "y",
      ],
      "title": "OpperInputExample",
      "type": "object",
    },
    outputSchema: {
      "properties": {
        "sum": {
          "title": "Sum",
          "type": "integer",
        },
      },
      "required": [
        "sum",
      ],
      "title": "OpperOutputExample",
      "type": "object",
    },
    input: {
      "x": 4,
      "y": 5,
    },
    examples: [
      {
        input: {
          "x": 1,
          "y": 3,
        },
        output: {
          "sum": 4,
        },
        comment: "Adds two numbers",
      },
    ],
    parentSpanId: "123e4567-e89b-12d3-a456-426614174000",
    tags: {
      "project": "project_456",
      "user": "company_123",
    },
    configuration: {},
  });

  console.log(result);
}

run();

```
<!-- End Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to use the `"beforeRequest"` hook to to add a
custom header and a timeout to requests and how to use the `"requestError"` hook
to log errors:

```typescript
import { Opper } from "opperai";
import { HTTPClient } from "opperai/lib/http";

const httpClient = new HTTPClient({
  // fetcher takes a function that has the same signature as native `fetch`.
  fetcher: (request) => {
    return fetch(request);
  }
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000)
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new Opper({ httpClient });
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { Opper } from "opperai";

const sdk = new Opper({ debugLogger: console });
```

You can also enable a default debug logger by setting an environment variable `OPPER_DEBUG` to true.
<!-- End Debugging [debug] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, this library is generated programmatically. Any manual changes added to internal files will be overwritten on the next generation. 
We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release. 

### SDK Created by [Speakeasy](https://www.speakeasy.com/?utm_source=opperai&utm_campaign=typescript)
