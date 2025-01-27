"use client";

import { useRouter } from "next/navigation";
import { Separator } from "../separator";

type ErrorProps = {
  statusCode?: number;
  message: string;
};

export const Error = ({ statusCode, message }: ErrorProps) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex items-center justify-center gap-7">
        <p className="text-2xl">{statusCode}</p>
        <Separator orientation="vertical" className="h-16 opacity-50" />
        <p className="font-extralight">{message}</p>
      </div>
    </div>
  );
};
