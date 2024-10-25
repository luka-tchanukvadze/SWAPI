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
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 hover:bg-blue-600 transition-colors duration-300"
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleClickNext}
        disabled={currentPage === totalPages || isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 hover:bg-blue-600 transition-colors duration-300"
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
