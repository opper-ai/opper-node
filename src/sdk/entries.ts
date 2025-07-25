/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { datasetsEntriesUpdate } from "../funcs/datasetsEntriesUpdate.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as models from "../models/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Entries extends ClientSDK {
  /**
   * Update Dataset Entry
   */
  async update(
    datasetId: string,
    entryId: string,
    updateDatasetEntryRequest: models.UpdateDatasetEntryRequest,
    options?: RequestOptions,
  ): Promise<models.UpdateDatasetEntryResponse> {
    return unwrapAsync(datasetsEntriesUpdate(
      this,
      datasetId,
      entryId,
      updateDatasetEntryRequest,
      options,
    ));
  }
}
