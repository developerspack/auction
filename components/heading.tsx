import { Separator } from "./ui/separator";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="fixed w-full z-30 dark:bg-black bg-white">
      <h2 className="lg:text-3xl text-xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-gray-300 mt-2 mb-2">{description}</p>
      <Separator />
    </div>
  );
};

export default Heading;
