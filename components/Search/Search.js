const Search = ({ searchTerm, handleChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
export default Search;
