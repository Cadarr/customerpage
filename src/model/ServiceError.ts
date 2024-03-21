interface ServiceError {
  message?: string;
  path?: string;
  error?: string;
  timestamp?: string;
  status?: number;
  messages?: [
    {
      property: string;
      message: string;
    }
  ];
}
