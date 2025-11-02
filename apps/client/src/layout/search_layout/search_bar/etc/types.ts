export interface PaginationArgT {
  page: number;
  limit: number;
}

export type SearchQueryArgT = PaginationArgT & Record<string, unknown>;

export type SearchQueryResT<T> = {
  hasPrePage: boolean;
  hasNextPage: boolean;
  queryForm: Record<string, unknown>;
} & PaginationDataT &
  T;

export interface PaginationDataT {
  nHits: number;
  pages: number;
}
