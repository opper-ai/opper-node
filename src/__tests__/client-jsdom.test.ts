/**
 * @jest-environment jsdom
 */

import Client from '../index';

describe('OpperAIClient jsdom', () => {
  it('should throw an error if dangerouslyAllowBrowser is not set to true in a browser-like environment', () => {
    expect(() => new Client({ apiKey: 'test-api-key', dangerouslyAllowBrowser: false })).toThrow(
      "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`"
    );
  });

  it('should not throw an error if dangerouslyAllowBrowser is set to true in a browser-like environment', () => {
    expect(
      () => new Client({ apiKey: 'test-api-key', dangerouslyAllowBrowser: true })
    ).not.toThrow();
  });
});
