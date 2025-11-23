import React, { useEffect, useState } from "react";
import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
import {
  FaList,
  FaRegFolder,
  FaRegFolderOpen,
  FaFileAlt,
} from "react-icons/fa";
import TreeView, { flattenTree } from "react-accessible-treeview";
import "./styles.css";

const TestTreeView = ({
  data,
  updateFilter,
}) => {
  const [flattenedData, setFlattenedData] = useState([]);

  useEffect(() => {
    if (data) {
      // Flatten the tree structure to be compatible with TreeView
      const flattened = flattenTree(data);
      setFlattenedData(flattened);
    }
  }, [data]);

  useEffect(() => {
  
    console.log("flattenedData", JSON.stringify(flattenedData, null, 2));
  
}, [flattenedData]);

  // Check if flattenedData is empty and display an error message
  if (flattenedData.length === 0) {
    return <div>No data available to display.</div>;
  }



  return (
    <div>
      <div className="directory">
        <TreeView
          onNodeSelect={(props) => {
            // console.log("Node selected:", props);
             const element = props?.element;

          // ✅ Always update selectedCatSubCatCode (whether it's a branch or leaf)
          if (element?.id) {
            const cleanedId = element.id.replace("M-", "");
            updateFilter("selectedCatSubCatCode", cleanedId);
            // console.log("✅ selectedCatSubCatCode set to:", cleanedId);
          }
        }}
          data={flattenedData} // Use the flattened data
          aria-label="directory tree"
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
          }) => (
            <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
              {isBranch ? (
                <FolderIcon isOpen={isExpanded} />
              ) : (
                <FileIcon filename={element.name} />
              )}
              {element.name}
            </div>
          )}
        />
      </div>
    </div>
  );
};

const FolderIcon = ({ isOpen }) =>
  isOpen ? (
    <FaRegFolderOpen color="e8a87c" className="icon" />
  ) : (
    <FaRegFolder color="e8a87c" className="icon" />
  );

const FileIcon = ({ filename }) => {
  const extension = filename.slice(filename.lastIndexOf(".") + 1);
  switch (extension) {
    case "js":
      return <DiJavascript color="yellow" className="icon" />;
    case "css":
      return <DiCss3 color="turquoise" className="icon" />;
    case "json":
      return <FaList color="yellow" className="icon" />;
    case "npmignore":
      return <DiNpm color="red" className="icon" />;
    default:
      return <FaFileAlt color="white" className="icon" />; // Default file icon
  }
};

export default TestTreeView;
