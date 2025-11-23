import { useEffect, useState } from "react";
import TreeView from "react-accessible-treeview"; // 🔧 Removed flattenTree import
import {
  FaList,
  FaRegFolder,
  FaRegFolderOpen,
  FaFileAlt,
} from "react-icons/fa";
import "./styles.css";

const PaymentTypeView = ({ data = [], updateFilter }) => {
  const [flattenedData, setFlattenedData] = useState([]);

  // ✅ NEW: Custom flattenTree function that retains custom props like `code`
  const customFlattenTree = (node, parentId = null, acc = []) => {
    const { children = [], ...rest } = node;
    const currentNode = {
      ...rest,
      parent: parentId,
      children: children.map(child => child.id),
    };
    acc.push(currentNode);
    children.forEach(child => customFlattenTree(child, node.id, acc));
    return acc;
  };

  // 🔧 CHANGED: Use custom flatten function instead of default `flattenTree`
  useEffect(() => {
    if (data) {
      const flattened = customFlattenTree(data);
      setFlattenedData(flattened);
    }
  }, [data]);

  const getDescendantLeafIds = (nodeId) => {
    const node = flattenedData.find((item) => item.id === nodeId);
    if (!node) return [];

    if (!node.children || node.children.length === 0) return [nodeId];

    const collectLeafIds = (ids) => {
      let leafIds = [];
      ids.forEach((childId) => {
        const child = flattenedData.find((item) => item.id === childId);
        if (child) {
          if (!child.children || child.children.length === 0) {
            leafIds.push(child.id);
          } else {
            leafIds = [...leafIds, ...collectLeafIds(child.children)];
          }
        }
      });
      return leafIds;
    };

    return collectLeafIds(node.children);
  };

  if (flattenedData.length === 0) {
    return <div>No data available to display.</div>;
  }

  return (
    <div className="directory">
      <TreeView
        onNodeSelect={(props) => {
          const element = props?.element;
          if (!element) return;

          // console.log("Clicked element:", element); 

          let selectedCodes = [];

          if (!element.children || element.children.length === 0) {
            // ✅ Leaf node
            selectedCodes = [element.code];
          } else {
            // ✅ Internal node: collect descendant leaf `code`s
            selectedCodes = getDescendantLeafIds(element.id)
              .map((leafId) => {
                const leaf = flattenedData.find((item) => item.id === leafId);
                return leaf?.code;
              })
              .filter(Boolean); // remove nulls
          }

          // console.log("Selected cash source codes:", selectedCodes);
          updateFilter("selectedCashSourceIds", selectedCodes);
        }}
        data={flattenedData}
        aria-label="Payment Source Tree"
        nodeRenderer={({ element, isBranch, isExpanded, getNodeProps, level }) => (
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
    case "json":
      return <FaList color="yellow" className="icon" />;
    case "css":
      return <FaList color="turquoise" className="icon" />;
    default:
      return <FaFileAlt color="white" className="icon" />;
  }
};

export default PaymentTypeView;
