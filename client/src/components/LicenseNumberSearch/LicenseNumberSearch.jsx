import React from "react";

const LicenseNumberSearch = ({
  labelText = "",
  disabled = false,
  placeholder = "Enter license number",
  searchTerm,
  setSearchTerm,
  fetch = [], // Array of functions for fetching data
  onFetchComplete, // Callback to return results to parent
  setLoading,
}) => {
  const onSearch = async () => {
    if (!searchTerm.trim()) return; // Do nothing if the search term is empty

    try {
      setLoading(true);
      // Execute all provided fetch functions with the search term
      const results = await Promise.all(fetch.map((fn) => fn(searchTerm)));

      // Pass results back to the parent component
      if (onFetchComplete) {
        onFetchComplete(results);
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div className="space-y-2">
      {/* Label (optional) */}
      {labelText && (
        <label
          htmlFor="searchInput"
          className="block text-sm font-medium text-gray-900"
        >
          {labelText}
        </label>
      )}

      {/* Input Field */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} // Handle key press events
          placeholder={placeholder}
          disabled={disabled}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Search Button */}
        <button
          type="button"
          onClick={onSearch}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          disabled={disabled}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default LicenseNumberSearch;
