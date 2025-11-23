
const FixedAssetFilter = ({ isCheckFixedAssets, setIsCheckFixedAssets }) => {
  return (
    <div className=" flex-row items-center space-x-3 mb-2 bg-gray-800 2 py-1 rounded text-lg">
      <label className="flex items-center space-x-3 mb-2  text-white px-2 py-1 rounded text-lg">
      <span>Fixed Assets</span>
      <input
        type="checkbox"
        className="bg-white"
        checked={isCheckFixedAssets}
        onChange={(e) => setIsCheckFixedAssets(e.target.checked)}
      />
    </label>
    <button className=" bg-gray-800 text-white border border-white rounded text-base p-1">Download PDF</button>
    </div>
    
  );
};

export default FixedAssetFilter;
