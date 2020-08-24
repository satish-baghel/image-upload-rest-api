import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
// React Redux
import { connect } from "react-redux";
// Action
import { addProduct } from "../../../action/addProduct";
const ProductForm = ({ addProduct }) => {
  const history = useHistory();

  const [formData, setformData] = useState({
    title: "",
    desc: "",
    img: "",
    price: "",
  });
  const { title, desc, img, price } = formData;
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onUploadFile = (e) => {
    setformData({ ...formData, img: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("title", title);
    fd.append("desc", desc);
    fd.append("img", img);
    fd.append("price", price);

    addProduct(fd);
    history.push("/");
  };
  return (
    <Fragment>
      <h2>Product Upload</h2>
      <div className="mt-2">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-1 col-form-label">
              Title
            </label>
            <div className="col-sm-11">
              <input
                type="text"
                name="title"
                onChange={(e) => onChange(e)}
                value={title}
                className="form-control"
                placeholder="Enter Title ..."
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="Description" className="col-sm-1 col-form-label">
              Description
            </label>
            <div className="col-sm-11">
              <textarea
                name="desc"
                value={desc}
                onChange={(e) => onChange(e)}
                className="form-control rounded-0"
                placeholder="Enter Description ..."
                rows="4"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="img" className="col-sm-1 col-form-label">
              Image
            </label>
            <div className="col-sm-11">
              <input
                name="img"
                type="file"
                aaccept="image/*"
                defaultValue={img}
                onChange={(e) => onUploadFile(e)}
                className="form-control-file"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="price" className="col-sm-1 col-form-label">
              Price
            </label>
            <div className="col-sm-11">
              <input
                name="price"
                type="text"
                onChange={(e) => onChange(e)}
                value={price}
                className="form-control"
                placeholder="Enter Price ..."
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default connect(null, { addProduct })(ProductForm);
