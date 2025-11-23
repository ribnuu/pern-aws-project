import React, { useEffect, useState } from "react";
import {
  AddProduct,
  selectUniqueProductIds,
} from "../../../store/point-of-sales/PointOfSalesSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsByCompanyId } from "../../../apis/PointOfSalesApiService";

const StockMaintainedBillingItems = () => {
  const dispatch = useDispatch();
  const uniqueProductIds = useSelector(selectUniqueProductIds);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProductsByCompanyId("companyIdGoesHere");
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = (itemId) => {
    // Replace with actual logic to fetch product details
    // const productDetails = getProductDetails(itemId); // Implement this function as per your application logic
    let productDetails = products.find(
      (item) => item.stock_balance_update.id === itemId
    );
    if (productDetails) {
      if (
        productDetails?.quantity &&
        productDetails?.stock_balance_update.balance < productDetails.quantity
      ) {
        toast.error("Failed to add item - Stock unavailable");
        return;
      }

      if (!productDetails.quantity) {
        productDetails.quantity = 1;
      }

      // Dispatch action to add product with all details
      dispatch(AddProduct(productDetails));
    }
  };

  return (
    <>
      {products.map((item) => {
        return (
          <button
            key={item.id}
            onClick={() => {
              handleAddItem(item.stock_balance_update.id);
            }}
          >
            {/* <div className="bg-white text-blue-500 border border-gray-900 rounded-md px-4 py-2 uppercase text-left"> */}
            <div
              className={`${
                uniqueProductIds.includes(item.stock_balance_update.id)
                  ? "bg-green-500"
                  : "bg-white"
              } text-blue-500 border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
            >
              {item.stock_item_header.item_name}{" "}
              <span className="text-red-500">
                {item.stock_balance_update.batch_number}
              </span>{" "}
              <span className="text-gray-500">
                {item.stock_balance_update.item_mrp}
              </span>{" "}
              <span className="text-purple-500">
                {item.stock_balance_update.balance}
              </span>
            </div>
          </button>
        );
      })}
    </>
  );
};

export default StockMaintainedBillingItems;
