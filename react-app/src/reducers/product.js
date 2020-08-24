import {
  ADD_PRODUCT,
  PRODUCT_ERROR,
  ALL_PRODUCTS,
  DELETE_PRODUCT,
  DELETE_ERROR,
  EDIT_PRODUCT,
  EDIT_ERROR,
} from "../action/types";

const initialState = {
  addProduct: null,
  getAllProduct: [],
  loading: true,
  error: {},
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PRODUCT:
    case EDIT_PRODUCT:
      return {
        ...state,
        addProduct: payload,
        loading: false,
      };
    case ALL_PRODUCTS:
      return {
        ...state,
        getAllProduct: payload,
        loading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        getAllProduct: state.getAllProduct.filter((del) => del._id !== payload),
        loading: false,
      };
    case DELETE_ERROR:
    case PRODUCT_ERROR:
    case EDIT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
