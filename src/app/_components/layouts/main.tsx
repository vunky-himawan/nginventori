import { cn } from "@/libs/utils";
import { SidebarProvider } from "../ui/sidebar";
import PageHeader from "./app-header";
import { AppSidebar } from "./app-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        id="content"
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "transition-[width] duration-200 ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh",
        )}
      >
        <SidebarProvider>
          <AppSidebar />
          <div className="flex w-full flex-col px-5 py-2">
            <PageHeader />
            {children}
          </div>
        </SidebarProvider>
      </div>
    </>
  );
};

export default MainLayout;
