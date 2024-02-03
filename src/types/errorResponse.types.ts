type TErrorSource = {
  path: string;
  message: string;
};

type TDataError = {
  success: boolean;
  message: string;
  errorSources: TErrorSource[];
};

export type TErrorResponse = {
  status: number;
  data: TDataError;
};
