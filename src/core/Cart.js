import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => {
          return (
            <Card
              cartUpdate={true}
              showAddProductButton={false}
              key={i}
              product={product}
              showRemoveProductButton={true}
              setRun={setRun}
              run={run}
            />
          );
        })}
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <React.Fragment>
        <h2>Your cart is empty.</h2>
        <Link to="/shop">Continue shopping</Link>
      </React.Fragment>
    );
  };

  return (
    <Layout
      className="container"
      title={"Shopping Cart"}
      description={"Manage your cart items. Add, remove or continue shopping."}>
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2>Your cart summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
}
