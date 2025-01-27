import { Error } from "@/app/_components/ui/error/main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error",
  description: "Internal Server Error",
};

const GlobalError = () => {
  return <Error statusCode={500} message="Internal Server Error" />;
};

export default GlobalError;
