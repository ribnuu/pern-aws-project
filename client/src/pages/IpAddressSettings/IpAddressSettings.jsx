import React, { useState } from "react";

const IpAddressSettings = () => {
  const [settings, setSettings] = useState({
    react: { ip: "", port: "" },
    node: { ip: "", port: "" },
    database: { ip: "", port: "" },
  });

  const handleChange = (server, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [server]: { ...prev[server], [field]: value },
    }));
  };

  const handleUpdate = () => {
    console.log("Settings updated:", settings);
    // Implement your update logic here
  };

  return (
    <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black p-6">
      <h1 className="text-2xl font-bold mb-6">IP Address Settings</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Server</th>
            <th className="border p-2">IP Address</th>
            <th className="border p-2">Port</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Server React</td>
            <td className="border p-2">
              <input
                type="text"
                value={settings.react.ip}
                onChange={(e) => handleChange("react", "ip", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                value={settings.react.port}
                onChange={(e) => handleChange("react", "port", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr>
            <td className="border p-2">Server Node</td>
            <td className="border p-2">
              <input
                type="text"
                value={settings.node.ip}
                onChange={(e) => handleChange("node", "ip", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                value={settings.node.port}
                onChange={(e) => handleChange("node", "port", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr>
            <td className="border p-2">Server Database</td>
            <td className="border p-2">
              <input
                type="text"
                value={settings.database.ip}
                onChange={(e) => handleChange("database", "ip", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                value={settings.database.port}
                onChange={(e) =>
                  handleChange("database", "port", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={handleUpdate}
        className="mt-6 p-2 bg-blue-500 text-white rounded-lg w-full"
      >
        Update
      </button>
    </div>
  );
};

export default IpAddressSettings;
