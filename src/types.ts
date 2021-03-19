import { ResponseType } from "axios";
import { AssetRead, AssetType, PreviewSize } from "src/commons-asset-api";
import { PageableResult } from "src/commons-rest-api";

export interface AssetUploadOptions {
  systemRefId?: string;
  context?: string;
  keyValue?: Record<string, string>;
}

export interface AssetDownloadOptions {
  responseType?: ResponseType;
  inline?: boolean;
}

export interface AssetUpdateOptions {
  keyValues?: Record<string, string>;
  systemRefId?: string;
  eol?: Date;
}

export interface AssetFetchOptions {
  pageSize?: number;
  page?: number;
  before?: Date;
  after?: Date;
  originalFilename?: string;
  referenceUrl?: string;
  context?: string;
  type?: AssetType;
  hasEolValue?: boolean;
  keyValue?: Record<string, string>;
  isEol?: boolean;
}

export interface AssetGetOptions {
  size?: PreviewSize | PreviewSize[];
}

export interface AssetPreviewOptions {
  responseType?: ResponseType;
}

export interface AssetClient {
  fetch(options?: AssetFetchOptions): Promise<PageableResult<AssetRead>>;
  get(id: string, options?: AssetGetOptions): Promise<AssetRead>;
  upload(file: unknown, options?: AssetUploadOptions): Promise<AssetRead>;
  update(id: string, options?: AssetUpdateOptions): Promise<AssetRead>;
  remove(id: string): Promise<void>;
  download<T>(id: string): Promise<T>;
  preview<T>(id: string, size: PreviewSize, options?: AssetPreviewOptions): Promise<T>;
  copy(id: string): Promise<AssetRead>;
}
