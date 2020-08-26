import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
// React Redux
import { connect } from "react-redux";
// Action
import { addProduct } from "../../../action/addProduct";
// React Image Crop
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// blueimp load image
//UseFul
import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
} from "./Useful";
const ProductForm = ({ addProduct }) => {
  const history = useHistory();

  const [formData, setformData] = useState({
    title: "",
    desc: "",
    img: null,
    price: "",
  });
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px",
    width: 300,
    height: 300,
  });
  // const [rotation, setRotation] = useState({
  //   newRotation: 0,
  // });

  const [preImage, setpreImage] = useState(null);
  // const { newRotation } = rotation;
  const { title, desc, img, price } = formData;
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onUploadFile = (e) => {
    setformData({ ...formData, img: URL.createObjectURL(e.target.files[0]) });
  };
  // const rotate = (e) => {
  //   e.preventDefault();
  //   let route = newRotation + 90;
  //   console.log(route);
  //   if (route >= 360) {
  //     route = -360;
  //   }
  //   setRotation({ newRotation: route });
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("title", title);
    fd.append("desc", desc);
    fd.append("img", newImage);
    fd.append("price", price);

    addProduct(fd);
    history.push("/");
  };

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    setpreImage(base64Image);
    const ext = extractImageFileExtensionFromBase64(base64Image);
    // console.log(ext);
    const fileName = Date.now() + "." + ext;
    // console.log(fileName);
    const b64 = base64StringtoFile(base64Image, fileName);
    // console.log(b64);
    setNewImage(b64);
  }

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
              {img && (
                <>
                  <div className="row">
                    <div className="col-5">
                      <ReactCrop
                        src={img}
                        onImageLoaded={setImage}
                        crop={crop}
                        locked
                        ruleOfThirds
                        onChange={setCrop}
                        className="img-fluid"
                      />
                    </div>
                    <div className="mr-2">
                      <i className="btn btn-success" onClick={getCroppedImg}>
                        Crop
                      </i>
                    </div>
                    {/* <div>
                      <i className="btn btn-success" onClick={(e) => rotate(e)}>
                        Right
                      </i>
                    </div> */}
                  </div>
                </>
              )}
              {preImage && (
                <div className="col-6">
                  <img
                    src={preImage}
                    // style={{ transform: `rotate(${newRotation}deg)` }}
                    alt="img"
                    className="img-fluid"
                  />
                </div>
              )}
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
