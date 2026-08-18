export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const httpError = (err: unknown): { status: number; message: string } => {
  if (err instanceof HttpError) {
    return { status: err.status, message: err.message };
  }
  return { status: 500, message: (err as Error).message };
};