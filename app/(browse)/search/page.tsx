import SearchClient from "./_component/SearchClient";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { term?: string };
}) {
  return {
    title: searchParams.term,
  };
}

const SearchPage = ({ searchParams }: { searchParams: { term?: string } }) => {
  return <SearchClient query={searchParams.term} />;
};

export default SearchPage;
