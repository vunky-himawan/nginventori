import MainLayout from "../_components/layouts/main";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainLayout>{children}</MainLayout>
    </>
  );
};

export default AuthenticatedLayout;
