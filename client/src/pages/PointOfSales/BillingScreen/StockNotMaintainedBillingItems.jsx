import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsByCompanyIdFromStockItemHeaderApi } from "../../../apis/PointOfSalesApiService";
import {
  AddProduct,
  selectUniqueProductIdsOfStockNotMaintainedItems,
  AddStockNotMaintainedProduct,
} from "../../../store/point-of-sales/PointOfSalesSlice";

const StockNotMaintainedBillingItems = () => {
  const dispatch = useDispatch();
  const { isLoadItemsFromStockItemHeader } = useSelector(
    (state) => state.pointOfSalesReducer
  );
  const uniqueProductIds = useSelector(
    selectUniqueProductIdsOfStockNotMaintainedItems
  );

  const [products, setProducts] = useState([]);
  const [searchTerm, setSeachTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (isLoadItemsFromStockItemHeader) {
        try {
          setProducts([]);
          const data = await getAllProductsByCompanyIdFromStockItemHeaderApi(
            "companyIdGoesHere"
          );

          if (data?.success) {
            setProducts(data.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [isLoadItemsFromStockItemHeader]);

  const handleAddItem = (itemId) => {
    // Replace with actual logic to fetch product details
    // const productDetails = getProductDetails(itemId); // Implement this function as per your application logic
    let productDetails = products.find((item) => item.item_code === itemId);
    if (productDetails) {
      // Dispatch action to add product with all details
      dispatch(AddStockNotMaintainedProduct(productDetails));
    }
  };

  //filter products base on search term
  const filterProducts = products.filter((item) =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Always show a maximum of 10 products, regardless of whether there is a search term
  const displayedProducts = searchTerm
    ? filterProducts.slice(0, 10)
    : products.slice(0, 10);

  return (
    <>
      <div className="py-1 px-[8px] ">
        <div className="mb-2">
          {/* search Input */}
          <input
            type="text"
            placeholder="search productes ..."
            className="text-center border px-4 py-2 rounded-md w-full  "
            value={searchTerm}
            onChange={(e) => setSeachTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md min-h-[400px] overflow-y-auto ">
          <div className="flex flex-wrap gap-2">
            {displayedProducts.map((item) => {
              return (
                <button
                  key={item.item_code}
                  onClick={() => {
                    handleAddItem(item.item_code);
                  }}
                  className="w-full  border border-gray-800 rounded-md uppercase text-left "
                >
                  {/* <div className="bg-white text-blue-500 border border-gray-900 rounded-md px-4 py-2 uppercase text-left"> */}
                  <div
                    className={`${
                      uniqueProductIds.includes(item.item_code)
                        ? "bg-green-500"
                        : "bg-white"
                    } text-blue-500  rounded-md px-4 py-2 `}
                  >
                    {item.item_name}{" "}
                    {/* <span className="text-red-500">
                {item.stock_balance_update.batch_number}
              </span>{" "}
              <span className="text-gray-500">
                {item.stock_balance_update.item_mrp}
              </span>{" "}
              <span className="text-purple-500">
                {item.stock_balance_update.balance}
              </span> */}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default StockNotMaintainedBillingItems;
