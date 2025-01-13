import { SidebarTrigger } from "../ui/sidebar";

const PageHeader = () => {
  return (
    <div className="flex h-max items-center justify-between py-2">
      <SidebarTrigger variant="outline" className="scale-150" />
    </div>
  );
};

export default PageHeader;
