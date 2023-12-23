interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div>
      <h2 className="lg:text-3xl text-xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-gray-300 mt-2">{description}</p>
    </div>
  );
};

export default Heading;
