import { Navbar } from "@/app/(browse)/_components/navbar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-24">
      <Navbar />
      {children}
    </div>
  );
};

export default BrowseLayout;
