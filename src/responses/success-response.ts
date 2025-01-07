import { NextResponse } from "next/server";

interface SuccessResponseData<T> {
  data: T;
  statusCode: number;
  message: string;
  success: boolean;
}

export class SuccessResponse<T> extends NextResponse {
  constructor(data: T, message: string = "Success") {
    const responseBody: SuccessResponseData<T> = {
      success: true,
      statusCode: 200,
      message,
      data,
    };

    super(JSON.stringify(responseBody), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
