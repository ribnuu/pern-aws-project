import React from "react";
import { useSelector } from "react-redux";

const RouteTable = () => {
  const { results } = useSelector((state) => state.formReducer);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-blue-100">
        <tr>
          {["Route", "Method", "Description", "Status", "Has PAth Params"].map(
            (header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                {header}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {results.map((item) => (
          <tr key={`${item.id}`}>
            <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
              {item.route}
            </td>
            <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
              {item.method}
            </td>
            <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
              {item.description}
            </td>
            <td className="px-6 py-2.5 whitespace-nowrap text-sm">
              <span
                className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                  item.is_deleted ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {item.is_deleted ? "INACTIVE" : "ACTIVE"}
              </span>
            </td>
            <td className="px-6 py-2.5 whitespace-nowrap text-sm">
              <span
                className={`px-3 py-1 rounded-full text-white text-xs font-semibold bg-yellow-500`}
              >
                {item.has_path_parameters ? "YES" : "NO"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RouteTable;
