import { TBreadcrumb } from "@/app/_components/types/breadcrumb-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import React from "react";

export const Breadcrumbs = ({ items }: { items: TBreadcrumb[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={item.path}>
            <BreadcrumbItem>
              {index !== items.length - 1 ? (
                <BreadcrumbLink href={item.path}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index !== items.length - 1 && <BreadcrumbSeparator key={index} />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
