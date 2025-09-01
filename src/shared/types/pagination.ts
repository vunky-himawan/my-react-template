import type { makeSource } from "../utils/pagination";
import type { IPaginationMeta } from "./params";

export type TPaginationResponse<T, M = IPaginationMeta> = {
  data: T;
  meta: M;
};

export type TSource<T> = ReturnType<typeof makeSource<T>>;
