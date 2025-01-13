import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import { Breadcrumbs } from "./breadcrumb";
import { Card } from "../../ui/card";

interface PageProps {
  topActions?: React.ReactNode;
  breadcrumbs?: TBreadcrumb[];
  title?: string;
  description?: string;
  subTitle?: string;
  children: React.ReactNode;
}

const Page = ({ title, description, breadcrumbs, topActions, children }: PageProps) => {
  return (
    <div className="flex flex-col py-2">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex gap-3">
            {title && <h1 className="text-3xl font-bold">{title}</h1>}
          </div>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
        <div>{topActions}</div>
      </div>
      <Card className="mt-3 flex h-max w-full flex-col border bg-white p-5 shadow-none">
        {children}
      </Card>
    </div>
  );
};

export default Page;
