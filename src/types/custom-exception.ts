import { NextResponse } from "next/server";

export class CustomException extends NextResponse {
  message: string;
  errorCode: number;
  name: string;
  errors?: Array<FieldErrorType>;

  constructor(errorCode: number, message: string, errors?: Array<FieldErrorType>) {
    super(null, { status: errorCode, statusText: message });
    this.message = message;
    this.errorCode = errorCode;
    this.name = this.constructor.name;
    this.errors = errors || [];
  }
}

export type FieldErrorType = {
  path: (string | number)[];
  message: string;
};
