import axios, { AxiosInstance } from "axios";
import { AssetRead, PreviewSize } from "src/commons-asset-api";
import { PageableResult } from "src/commons-rest-api";
import {
  AssetClient,
  AssetDownloadOptions,
  AssetFetchOptions,
  AssetGetOptions,
  AssetPreviewOptions,
  AssetUpdateOptions,
  AssetUploadOptions,
} from "src/types";

export function createAssetClient(client: AxiosInstance = axios.create({ baseURL: "/api/asset" })): AssetClient {
  const defaultResponseType = typeof window !== "undefined" ? "blob" : "arraybuffer";

  async function fetch(options: AssetFetchOptions): Promise<PageableResult<AssetRead>> {
    return (await client.get("/", { params: options })).data;
  }

  async function get(id: string, options?: AssetGetOptions): Promise<AssetRead> {
    return (await client.get(`/${id}`, { params: options })).data;
  }

  async function remove(id: string): Promise<void> {
    await client.delete(`/${id}`);
  }

  async function download<T>(id: string, options?: AssetDownloadOptions): Promise<T> {
    const { responseType = defaultResponseType, ...params } = options ?? {};
    return (await client.get(`/${id}/b`, { params, responseType })).data as T;
  }

  async function copy(id: string): Promise<AssetRead> {
    return (await client.post(`/${id}/copy`)).data;
  }

  async function preview<T>(id: string, size: PreviewSize, options?: AssetPreviewOptions): Promise<T> {
    const { responseType = defaultResponseType } = options ?? {};
    return (await client.get(`/${id}/${size}`, { responseType })).data;
  }

  function formatKeyValue(kv: Record<string, string> = {}): Record<string, string> {
    return Object.fromEntries(Object.entries(kv).map(([key, value]) => [`k_${key}`, value]));
  }

  async function upload(file: unknown, options?: AssetUploadOptions): Promise<AssetRead> {
    const { keyValue, ...params } = options ?? {};
    const kv = formatKeyValue(keyValue);
    return (await client.post("/", file, { params: { ...kv, ...params } })).data;
  }

  async function update(id: string, options?: AssetUpdateOptions): Promise<AssetRead> {
    return (await client.put(`/${id}`, options)).data;
  }

  return { fetch, get, remove, download, copy, preview, upload, update };
}
