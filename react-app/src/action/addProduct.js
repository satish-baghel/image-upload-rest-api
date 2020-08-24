import axios from "axios";
import swal from "sweetalert";
import {
  ADD_PRODUCT,
  PRODUCT_ERROR,
  ALL_PRODUCTS,
  DELETE_PRODUCT,
  DELETE_ERROR,
  EDIT_PRODUCT,
  EDIT_ERROR,
} from "./types";

// Add Product

export const addProduct = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/product", formData);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });
    swal("Good job!", "Product Add Success", "success", {
      timer: 3000,
    });
    dispatch(getProducts());
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
    });
    swal("oops!", "Product is not add", "error", {
      timer: 3000,
    });
  }
};

// GET  All Products

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("api/product");
    // console.log(res.data);
    dispatch({
      type: ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {}
};

// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`api/product/${id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
    swal("Delete ", "Product Deleted", "success", {
      timer: 3000,
    });
  } catch (err) {
    dispatch({
      type: DELETE_ERROR,
    });
  }
};

// Edit Product

export const editProduct = (formData, id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/product/${id}`, formData);
    dispatch({
      type: EDIT_PRODUCT,
      payload: res.data,
    });
    dispatch(getProducts());
    swal("Good job!", "Update Product Success", "success", {
      timer: 3000,
    });
  } catch (err) {
    dispatch({
      type: EDIT_ERROR,
    });
    swal("oops!", "Product is not Update", "error", {
      timer: 3000,
    });
  }
};
