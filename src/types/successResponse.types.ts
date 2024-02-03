import { BaseQueryApi } from "@reduxjs/toolkit/query";

type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TSuccessResponse<T> = {
  success: boolean;
  message: string;
  meta?: TMeta | undefined;
  data: T;
};

export type TResponseRedux<T> = TSuccessResponse<T> & BaseQueryApi;
