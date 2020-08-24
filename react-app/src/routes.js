import React from "react";

const ProductForm = React.lazy(() =>
  import("./views/pages/product/productForm")
);
const EditProduct = React.lazy(() =>
  import("./views/pages/product/editProduct")
);

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/product-upload", name: "Product Upload", component: ProductForm },
  {
    path: `/product-edit/:id`,
    name: "Product Edit",
    component: EditProduct,
  },
];

export default routes;
