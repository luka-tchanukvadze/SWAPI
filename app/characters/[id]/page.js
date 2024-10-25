import CharacterDetails from "@/components/Characters/CharacterDetails";

const Page = async ({ params }) => {
  const { id } = await params;

  return <CharacterDetails />;
};

export default Page;
