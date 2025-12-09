export type ErrorResponse<T> = {
  message: string;
  data?: T;
  status: "error";
};
