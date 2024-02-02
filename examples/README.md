# Opper TypeScript Examples

This directory contains examples of how to use the Opper TypeScript SDK.

## Running the examples

First, create an `example` function in Opper, with the following configuration:
- **Path**: `example`
- **Instructions**: `Translate to German`

Create an `.env` file in the `examples/` directory and add the following variables:

```shell
OPPER_API_KEY=op-xxx
```

Next, install the required packages:

```shell
npm install
```

Run the examples:

`basic.ts`: Simple example of how to use the Opper TypeScript SDK to send a message to a function and receive a response.

```shell
npm run basic
```

`streaming.ts`: Example of how to use the Opper TypeScript SDK to start a streaming connection to a function and receive messages.

```shell
npm run streaming
```
