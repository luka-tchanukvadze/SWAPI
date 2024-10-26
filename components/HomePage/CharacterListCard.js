import Link from "next/link";
const CharacterListCard = ({ myKey, charName, charLink }) => {
  return (
    <div
      key={myKey}
      className="bg-gray-700 rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-yellow-400">
          {charName}
        </h2>
      </div>
      <div className="px-4 pb-4">
        <Link
          href={charLink}
          className="block w-full text-center bg-yellow-500 text-gray-800 py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
export default CharacterListCard;
