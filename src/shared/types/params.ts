export interface IPaginateParam {
  page?: number;
  limit?: number;
}

export interface IPaginationMeta {
  itemCount: number;
  totalItems: number;
  itemPerPage: number;
  totalPages: number;
  currentPage: number;
}

export type TPaginationResponse<T, M = IPaginationMeta> = {
  data: T;
  meta: M;
};
