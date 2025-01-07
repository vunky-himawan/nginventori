const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen w-screen bg-blue-100 p-5">{children}</div>
    </>
  );
};

export default MainLayout;
