import { NextResponse } from "next/server";
import superjson from "superjson";

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

    super(superjson.stringify(responseBody), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
