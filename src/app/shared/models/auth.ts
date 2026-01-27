export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    personSyncId: string;
  };
  errorCode: string | null;
  timestamp: string;
  validationErrors: any | null;
}
