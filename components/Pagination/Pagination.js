const Pagination = ({
  currentPage,
  isLoading,
  totalPages,
  handleClickNext,
  handleClickPrevious,
}) => {
  return (
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        onClick={handleClickPrevious}
        disabled={currentPage === 1 || isLoading}
        className="px-4 py-2 bg-yellow-500 text-gray-800 rounded-md disabled:opacity-50 hover:bg-yellow-600 transition-colors duration-300"
      >
        Previous
      </button>
      <span className="text-yellow-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleClickNext}
        disabled={currentPage === totalPages || isLoading}
        className="px-4 py-2 bg-yellow-500 text-gray-800 rounded-md disabled:opacity-50 hover:bg-yellow-600 transition-colors duration-300"
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
