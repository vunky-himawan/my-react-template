import type { IPaginateParam, IPaginationMeta, TPaginationResponse } from "@/shared/types/params";

export const paginationTransform = (t?: IPaginationMeta) => {
  return {
    current: t?.currentPage,
    pageSize: t?.itemPerPage,
    total: t?.totalItems,
  };
};

export const makeSource = <T>(data?: TPaginationResponse<T>) => {
  return {
    data: data?.data,
    meta: paginationTransform(data?.meta),
  };
};

export const makePagination = (pagination: IPaginateParam) => {
  return {
    page: pagination.page ?? 1,
    perPage: pagination.perPage ?? 10,
  };
};
