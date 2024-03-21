interface ServiceError {
  path: string;
  error: string;
  timestamp: string;
  status: number;
  messages?: [
    {
      property: string;
      message: string;
    }
  ];
}
