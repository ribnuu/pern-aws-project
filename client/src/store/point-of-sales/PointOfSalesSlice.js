// reducers/pointOfSalesSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createReturnBillDataApi,
  createStockBillDetailApi,
  createStockCustomerOrderDetailApi,
  getStockBillDetailByBillNumber,
  getStockCustomerOrderDetailByOrderNumber,
} from "../../apis/PointOfSalesApiService";
import { reduce } from "lodash";

// Initial state for the pointOfSales slice
const initialState = {
  customerName: "",
  customerNumber: "",
  typeOfPayment: "",
  tenderAmount: 0,
  balanceAmount: 0,
  grandTotal: 0,
  last4DigitsOfCard: "",
  typeOfCard: "",
  products: [], // Array to hold products
  billNumber: "",
  orderNumber: "",
  createdBy: "",
  dateTime: "",
  deliveryDate: "",
  remark: "",
  deleteStatus: "",
  loading: false,
  error: null,
  success: false,
  billingSuccess: false,
  isGrnEnabled: false,
  isCollection: false,
  isDamageReplacement: false,
  isBillToCompany: true,
  stockCustomerInstitutionData: null,
  isLoadItemsFromStockItemHeader: true,
  // Termporary field
  billDateTime: null,
  stockCustomerInstitutionId: null,
};

// Create the pointOfSales slice
const pointOfSalesSlice = createSlice({
  name: "pointOfSales",
  initialState,
  reducers: {
    SetPointOfSalesSliceField: (state, action) => {
      const { field, value } = action.payload;
      if (state.hasOwnProperty(field)) {
        state[field] = value;
      } else {
        console.warn(`Field ${field} does not exist in the state.`);
      }
    },
    // Reducer to add a new product
    AddProduct: (state, action) => {
      const newProduct = action.payload;
      // Check if the product already exists
      const existingProduct = state.products.find(
        (product) =>
          product.stock_balance_update.id === newProduct.stock_balance_update.id
      );
      if (existingProduct) {
        // existingProduct.quantity += 1;
        const toUpdateQty = existingProduct.quantity + newProduct.quantity;
        if (toUpdateQty > existingProduct.stock_balance_update.balance) {
          return;
        }
        // existingProduct.quantity += newProduct.quantity; // Increase quantity
        existingProduct.quantity = toUpdateQty; // Increase quantity
      } else {
        state.products.push(newProduct); // Add new product
      }
    },
    AddStockNotMaintainedProduct: (state, action) => {
      const newProduct = action.payload;

      // Check if the product already exists
      const existingProduct = state.products.find(
        (product) => product.item_code === newProduct.item_code
      );

      if (existingProduct) {
        const toUpdateQty = existingProduct.quantity + newProduct.quantity;
        existingProduct.quantity = toUpdateQty;
      } else {
        try {
          newProduct.quantity = 1;
        } catch (error) {}
        newProduct.discountPercentage = 0;
        newProduct.discountAmount = 0;
        state.products.push(newProduct);
      }
    },

    // Reducer to increase the count of a product by ID
    IncreaseProductCountById: (state, action) => {
      const { productId, count } = action.payload;
      const product = state.products.find(
        (p) => p.stock_balance_update.id === productId
      );
      if (product.quantity + 1 > product.stock_balance_update.balance) {
        return;
      }
      if (product.quantity) {
        product.quantity += 1;
      } else {
        product.quantity = 1;
      }
    },

    // Reducer to increase the count of a product by ID
    IncreaseProductCountByIdForStockNotMaintainedProduct: (state, action) => {
      const { productId, count } = action.payload;
      const product = state.products.find((p) => p.item_code === productId);

      if (product.quantity) {
        product.quantity = parseInt(product.quantity) + 1;
      } else {
        product.quantity = 1;
      }
    },
    // Reducer to increase the return count of a product by ID
    IncreaseReturnProductCountByIdForStockNotMaintainedProduct: (
      state,
      action
    ) => {
      const { productId, count } = action.payload;
      const product = state.products.find((p) => p.item_code === productId);

      if (product.returnQuantity) {
        product.returnQuantity = parseInt(product.returnQuantity) + 1;
      } else {
        product.returnQuantity = 1;
      }
    },

    // Reducer to decrease the count of a product by ID
    DecreaseProductCountById: (state, action) => {
      const { productId, count } = action.payload;
      const product = state.products.find(
        (p) => p.stock_balance_update.id === productId
      );
      if (product) {
        product.quantity -= 1;
        if (product.quantity < 0) {
          product.quantity = 0;
        }
      }
    },

    DecreaseProductCountByIdForStockNotMaintainedProduct: (state, action) => {
      const { productId, count } = action.payload;
      const product = state.products.find((p) => p.item_code === productId);
      if (product) {
        product.quantity -= 1;
        if (product.quantity < 0) {
          product.quantity = 0;
        }
      }
    },
    // Reducer to decrease the return count of a product by ID
    DecreaseReturnProductCountByIdForStockNotMaintainedProduct: (
      state,
      action
    ) => {
      const { productId, count } = action.payload;
      const product = state.products.find((p) => p.item_code === productId);
      if (product) {
        product.returnQuantity -= 1;
        if (product.returnQuantity < 0) {
          product.returnQuantity = 0;
        }
      }
    },

    // Reducer to remove a product by ID
    RemoveProductById: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (p) => p.stock_balance_update.id !== productId
      );
    },

    RemoveProductByIdForStockNotMaintainedProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((p) => p.item_code !== productId);
    },

    UpdateProductQuantity: (state, action) => {
      const { productId, count } = action.payload;
      if (count < 0 || count >= 10000) {
        return;
      }

      const product = state.products.find(
        (p) => p.stock_balance_update.id === productId
      );

      if (
        parseInt(product.quantity) + parseInt(count) >
        product.stock_balance_update.balance
      ) {
        return;
      }

      if (product) {
        product.quantity = count;
      }
    },
    UpdateProductQuantityForStockNotMaintainedProduct: (state, action) => {
      const { productId, count } = action.payload;
      if (count < 0 || count >= 10000) {
        return;
      }

      const product = state.products.find((p) => p.item_code === productId);

      if (product) {
        product.quantity = count;
      }
    },
    //Reducer to update return quantity of product
    UpdateProductReturnQuantityForStockNotMaintainedProduct: (
      state,
      action
    ) => {
      const { productId, count } = action.payload;

      const product = state.products.find((p) => p.item_code === productId);

      if (!product) return;

      // If empty input or invalid value, set to 0
      if (count === "" || isNaN(count) || count < 0 || count >= 10000) {
        product.returnQuantity = 0;
      } else {
        product.returnQuantity = count;
      }
    },
    // Reducer to reset the state to initial state
    ResetState: (state) => {
      // console.log("ResetState called");
      return initialState;
    },
    ResetPaymentInfo: (state, _) => {
      state.typeOfPayment = "";
      state.tenderAmount = 0;
      state.last4DigitsOfCard = "";
      state.typeOfCard = "";
    },
    // Update discount percentage and recalculate amount
    UpdateItemDiscountPercentage: (state, action) => {
      const { productId, percentage } = action.payload;
      const product = state.products.find((p) => p.item_code === productId);
      if (product && product.details?.[0]?.mrp && product.quantity) {
        const total = product.details[0].mrp * product.quantity;
        const discountAmount = (total * percentage) / 100;
        product.discountPercentage = percentage;
        product.discountAmount = discountAmount;
      }
    },
    // Update discount amount and recalculate percentage
    UpdateItemDiscountAmount: (state, action) => {
      const { productId, amount } = action.payload;
      console.log(action.payload);

      const product = state.products.find((p) => p.item_code === productId);
      if (product && product.details?.[0]?.mrp && product.quantity) {
        const total = product.details[0].mrp * product.quantity;
        const discountPercentage = (amount / total) * 100;
        product.discountAmount = amount;
        product.discountPercentage = discountPercentage;
      }
    },
    //Distribution total discount
    DistributeTotalDiscount: (state, action) => {
      const totalDiscount = action.payload;
      const subtotal = state.products.reduce((acc, item) => {
        const itemTotal = (item.details?.[0]?.mrp || 0) * item.quantity;
        return acc + itemTotal;
      }, 0);

      if (subtotal === 0 || totalDiscount <= 0) return;

      state.products.forEach((item) => {
        const mrp = item.details?.[0]?.mrp || 0;
        const quantity = item.quantity || 0;
        const itemTotal = mrp * quantity;
        const proportion = itemTotal / subtotal;
        const discountAmount = totalDiscount * proportion;
        const discountPercentage =
          itemTotal > 0 ? (discountAmount / itemTotal) * 100 : 0;

        item.discountAmount = parseFloat(discountAmount);
        item.discountPercentage = parseFloat(discountPercentage);
      });
    },
    DistributeTotalDiscountByPercentage: (state, action) => {
      const totalDiscountPercentage = parseFloat(action.payload);
      const subtotal = state.products.reduce((acc, item) => {
        const mrp = item.details?.[0]?.mrp || 0;
        return acc + mrp * item.quantity;
      }, 0);

      if (subtotal <= 0 || totalDiscountPercentage <= 0) return;

      const totalDiscount = (totalDiscountPercentage / 100) * subtotal;

      state.products.forEach((item) => {
        const itemTotal = (item.details?.[0]?.mrp || 0) * item.quantity;
        const proportion = itemTotal / subtotal;
        const discountAmount = parseFloat(
          (totalDiscount * proportion).toFixed(2)
        );
        const discountPercentage =
          itemTotal > 0
            ? parseFloat(((discountAmount / itemTotal) * 100).toFixed(2))
            : 0;

        item.discountAmount = discountAmount;
        item.discountPercentage = discountPercentage;
      });
    },
  },

  extraReducers: (builder) => {
    //handle create a bill record
    builder
      .addCase(createBillRecordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBillRecordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.billingSuccess = action.payload.success;
        state.billNumber = action.payload.billNumber; // Update bill number from API response
        state.createdBy = action.payload.userId; //update createdBy from API responce
        console.log("State after API success:", state);
      })
      .addCase(createBillRecordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //handle get a record
    builder
      .addCase(fetchBillDetailsAsync.pending, (state) => {
        state.loading = true;
        state.error = true;
      })
      .addCase(fetchBillDetailsAsync.fulfilled, (state, action) => {
        console.log("Fetched bill data:", action.payload);
        state.loading = false;
        state.error = null;

        const billData = action.payload;
        state.customerName = billData.header.customer_name;
        state.customerNumber = billData.header.customer_number;

        state.tenderAmount = billData.header.paid_amount;
        state.balanceAmount = billData.header.balance_amount;
        state.dateTime = billData.header.created_at;
        state.deleteStatus = billData.header.is_deleted;

        // Transform the billData.details array into the required products structure
        state.products = billData.details.map((item) => ({
          item_code: item.item_code,
          item_name: "", // Placeholder, update if necessary
          item_category: item.item_code, // Use appropriate mapping
          item_sub_category: item.item_code,
          supplier: item.item_code, // Update if supplier data is available
          created_by: "", // Placeholder for creator
          created_at: item.created_at,
          updated_at: item.updated_at,
          maintain_stock: true, // Assuming stock maintenance is true
          maintain_batch: true, // Assuming batch maintenance is true
          details: [
            {
              id: item.id,
              item_code: item.item_code,
              created_at: item.created_at,
              updated_at: item.updated_at,
              expiry_date: "", // Update if expiry date is available
              mrp: item.mrp,
              cost: item.cost,
              created_by: "", // Placeholder
            },
          ],
          quantity: item.quantity,
        }));

        console.log("Updated Redux state:", state);
      })
      .addCase(fetchBillDetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchCustomerOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerOrderAsync.fulfilled, (state, action) => {
        const data = action.payload;

        state.customerName = data.customerName;
        state.orderNumber = data.orderNumber;
        state.tenderAmount = data.tenderAmount;
        state.dateTime = data.dateTime;
        state.deleteStatus = data.deleteStatus;
        state.deliveryDate = state.deliveryDate = new Date(data.delivery_date)
          .toISOString()
          .split("T")[0];
        state.remark = data.remark;

        //product details
        // state.products = data.products.map((item) => ({}));
      })
      .addCase(fetchCustomerOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Handle a create return bill record
    builder
      .addCase(createReturnBillRecordAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createReturnBillRecordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.billingSuccess = action.payload.success;
        console.log("State after API success:", state);
      })
      .addCase(createReturnBillRecordAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selector to get unique product IDs
export const selectUniqueProductIds = (state) => {
  return [
    ...new Set(
      state.pointOfSalesReducer.products.map(
        (product) => product.stock_balance_update.id
      )
    ),
  ];
};

// Selector to get unqiue product Ids from Stock not maintained items billing
export const selectUniqueProductIdsOfStockNotMaintainedItems = (state) => {
  return [
    ...new Set(
      state.pointOfSalesReducer.products.map((product) => product.item_code)
    ),
  ];
};

// Thunk function to create a new bill record
export const createBillRecordAsync = createAsyncThunk(
  "pointOfSales/createBillRecord",
  async ({ billDateTime, context }, { getState, rejectWithValue }) => {
    try {
      const {
        customerName,
        customerNumber,
        typeOfPayment,
        tenderAmount,
        orderNumber,
        last4DigitsOfCard,
        typeOfCard,
        products,
        deliveryDate,
        remark,
        isGrnEnabled,
        isCollection,
        isDamageReplacement,
        isBillToCompany,
        isLoadItemsFromStockItemHeader,
        stockCustomerInstitutionData,
        stockCustomerInstitutionId,
      } = getState().pointOfSalesReducer;

      const userId = localStorage.getItem("user_id");

      const billData = {
        items: products.map((item) => ({
          ...item,
          discountAmount: item.discountAmount || 0,
          discountPercentage: item.discountPercentage || 0,
        })),
        customerName,
        customerNumber,
        typeOfPayment,
        tenderAmount,
        last4DigitsOfCard,
        typeOfCard,
        userId,
        isGrnEnabled,
        isBillToCompany,
        billDateTime,
        isEnabledStockManagement: !isLoadItemsFromStockItemHeader,
        stockCustomerInstitutionData,
        stockCustomerInstitutionId,
      };

      const orderData = {
        items: products.map((item) => ({
          ...item,
          discountAmount: item.discountAmount || 0,
          discountPercentage: item.discountPercentage || 0,
        })),
        customerName,
        customerNumber,
        orderNumber,
        typeOfPayment,
        tenderAmount,
        last4DigitsOfCard,
        typeOfCard,
        userId,
        deliveryDate,
        remark,
        isGrnEnabled,
        isCollection,
        isDamageReplacement,
        isBillToCompany,
        billDateTime,
        isEnabledStockManagement: !isLoadItemsFromStockItemHeader,
        stockCustomerInstitutionData,
        stockCustomerInstitutionId,
      };

      let response;
      // console.log(JSON.stringify(orderData, null, 2));
      // console.log(JSON.stringify(billData, null, 2));

      if (context === "bill") {
        response = await createStockBillDetailApi(billData);
      } else if (context === "customerOrder") {
        response = await createStockCustomerOrderDetailApi(orderData);
      }

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Thunk function to fetch a bill record
export const fetchBillDetailsAsync = createAsyncThunk(
  "pointOfSales/fetchBillDetails",
  async (billNumber, { rejectWithValue }) => {
    try {
      const response = await getStockBillDetailByBillNumber(billNumber);
      return response.data; // Return bill details
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Thunk function to fetch a customer order record
export const fetchCustomerOrderAsync = createAsyncThunk(
  "pointOfSales/fetchCustomerOrderDetails",
  async (orderNumber, { rejectWithValue }) => {
    console.log("work");
    try {
      const response = await getStockCustomerOrderDetailByOrderNumber(
        orderNumber
      );
      return response.data[0]; // Return bill details
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Thunk function to create a return bill record
export const createReturnBillRecordAsync = createAsyncThunk(
  "pointOfSales/createReturnBillRecord",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;

    try {
      const {
        customerName,
        customerNumber,
        products,
        billNumber,
        isGrnEnabled,
        isBillToCompany,
        billDateTime,
        isEnabledStockManagement,
        stockCustomerInstitutionData,
        stockCustomerInstitutionId,
      } = getState().pointOfSalesReducer;

      const userId = localStorage.getItem("user_id");

      const returnBillData = {
        items: products,
        userId,
        customerName,
        customerNumber,
        billNumber,
        isGrnEnabled,
        isBillToCompany,
        billDateTime,
        isEnabledStockManagement,
        stockCustomerInstitutionData,
        stockCustomerInstitutionId,
      };

      const response = await createReturnBillDataApi(returnBillData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Export actions
export const {
  AddProduct,
  IncreaseProductCountById,
  DecreaseProductCountById,
  RemoveProductById,
  RemoveProductByIdForStockNotMaintainedProduct,
  UpdateProductQuantity,
  ResetState,
  SetPointOfSalesSliceField,
  AddStockNotMaintainedProduct,
  IncreaseProductCountByIdForStockNotMaintainedProduct,
  IncreaseReturnProductCountByIdForStockNotMaintainedProduct,
  DecreaseProductCountByIdForStockNotMaintainedProduct,
  DecreaseReturnProductCountByIdForStockNotMaintainedProduct,
  UpdateProductQuantityForStockNotMaintainedProduct,
  UpdateProductReturnQuantityForStockNotMaintainedProduct,
  ResetPaymentInfo,
  UpdateItemDiscountPercentage,
  UpdateItemDiscountAmount,
  DistributeTotalDiscount,
  DistributeTotalDiscountByPercentage,
} = pointOfSalesSlice.actions;

// Export reducer
export default pointOfSalesSlice.reducer;
