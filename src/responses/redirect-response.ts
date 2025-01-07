import { NextResponse } from "next/server";

interface RedirectResponseData {
  statusCode: number;
  message: string;
  redirectUrl: string;
  success: boolean;
}

export class RedirectResponse extends NextResponse {
  constructor(redirectUrl: string, message: string = "Redirecting", statusCode: number = 302) {
    const responseBody: RedirectResponseData = {
      success: true,
      statusCode,
      message,
      redirectUrl,
    };

    super(JSON.stringify(responseBody), {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
        Location: redirectUrl,
      },
    });
  }

  static temporary(url: string, message?: string) {
    return new RedirectResponse(url, message, 302);
  }

  static permanent(url: string, message?: string) {
    return new RedirectResponse(url, message, 301);
  }
}
