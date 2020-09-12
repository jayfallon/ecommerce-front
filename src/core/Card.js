import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

export default function Card({
  product,
  showViewProductButton = true,
  showAddProductButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mb-2 mt-2 mr-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    console.log({ product });
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddButton = (showAddProductButton) => {
    return (
      showAddProductButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mb-2 mt-2">
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger mb-2 mt-2">
          Delete Item
        </button>
      )
    );
  };
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-pill badge-primary mr-3">In Stock</span>
    ) : (
      <span className="badge badge-pill badge badge-warning mr-3">
        Out of Stock
      </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 30)}</p>
        <p>{product.price}</p>
        <p>Category: {product.category && product.category.name}</p>
        <p>Added on {moment(product.createdAt).fromNow()}</p>
        <p>{showStock(product.quantity)}</p>
        {showViewButton(showViewProductButton)}
        {showAddButton(showAddProductButton)}
        {showCartUpdateOptions(cartUpdate)}
        {showRemoveButton(showRemoveProductButton)}
      </div>
    </div>
  );
}
