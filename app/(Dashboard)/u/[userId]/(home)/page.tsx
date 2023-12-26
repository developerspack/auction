import Profile from "@/components/Profile";

const DashboardHomePage = ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  return (
    <div>
      <Profile userId={params.userId} />
    </div>
  );
};

export default DashboardHomePage;
