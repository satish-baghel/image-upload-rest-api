import React, { Fragment, useEffect } from "react";
import "./style.css";
import PropTypes from "prop-types";
// Components
import Spinner from "../pages/Loading/spinner";
// Action
import { getProducts, deleteProduct } from "../../action/addProduct";
// React Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Dashboard = ({
  fetchProduct: { getAllProduct, loading },
  getProducts,
  deleteProduct,
}) => {
  // Get All Product List
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const onDelete = (e, id) => {
    e.preventDefault();
    deleteProduct(id);
    // console.log(id);
  };
  return (
    <Fragment>
      {!loading ? (
        getAllProduct.map((product) => (
          <div
            className="card mb-3"
            style={{ maxWidth: "1440px" }}
            key={product._id}
          >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src={product.img}
                  className="bd-placeholder-img"
                  alt={product.title}
                  width="350vh"
                  height="250vh"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body" id="card-body btn">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    Price: <strong>₹ {product.price}</strong>
                  </p>
                  <p className="card-text">{product.desc}</p>
                </div>
                <div className="card-body" id="btn">
                  <Link
                    to={`product-edit/${product._id}`}
                    className=" fa-lg mr-1 btn btn-success"
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    Edit
                  </Link>
                  <a
                    href="!#"
                    onClick={(e) => onDelete(e, product._id)}
                    className="btn btn-danger float-right"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
Dashboard.protoType = {
  getProducts: PropTypes.func.isRequired,
  fetchProduct: PropTypes.object.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  fetchProduct: state.product,
});

export default connect(mapStateToProps, { getProducts, deleteProduct })(
  Dashboard
);
