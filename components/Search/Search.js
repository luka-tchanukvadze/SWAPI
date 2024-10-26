const Search = ({ searchTerm, handleChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 text-yellow-400 placeholder-gray-400"
      />
    </div>
  );
};
export default Search;
