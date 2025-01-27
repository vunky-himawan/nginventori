import { Error } from "@/app/_components/ui/error/main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Denied",
  description: "Access Denied",
};

const Denied = () => {
  return (
    <>
      <Error statusCode={403} message="You don't have permission to access this page" />
    </>
  );
};

export default Denied;
