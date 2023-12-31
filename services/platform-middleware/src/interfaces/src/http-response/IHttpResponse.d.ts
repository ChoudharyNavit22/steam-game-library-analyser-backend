export type ISingleValueHttpResponse<T> = {
    success: boolean;
    message?: string;
    data?: T | undefined;
  };
  
  export type IMultiValueHttpResponse<T> = {
    count: number;
    success: boolean;
    message?: string;
    data?: T[];
  };
  
  export type IMutationResult<T = void> = {
    success: boolean;
    message?: string;
    data?: T | undefined;
  };