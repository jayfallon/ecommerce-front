import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import Layout from "../core/Layout";
import moment from "moment";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = (orders) => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total Orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No Orders</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}>
        <option>Update Status</option>
        {statusValues.map((status, index) => {
          return (
            <option value={status} key={index}>
              {status}
            </option>
          );
        })}
      </select>
    </div>
  );

  return (
    <Layout
      title="orders"
      description={`G'day ${user.name}, these are your orders.`}
      className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength(orders)}
          {orders.map((o, oIndex) => {
            return (
              <div
                key={oIndex}
                style={{ borderBottom: "1px solid indigo" }}
                className="mt-5">
                <h2 className="mb-5">
                  <span
                    className="bg-primary"
                    style={{ color: "#ffffff", padding: "5px" }}>
                    {o._id}
                  </span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">{showStatus(o)}</li>
                  <li className="list-group-item">
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${o.amount}</li>
                  <li className="list-group-item">Ordered by: {o.user.name}</li>
                  <li className="list-group-item">
                    Ordered On: {moment(o.created_at).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address: {o.address}
                  </li>
                </ul>

                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order: {o.products.length}
                </h3>
                {o.products.map((p, pIndex) => {
                  return (
                    <div
                      className="mb-4"
                      key={pIndex}
                      style={{ padding: "20px", border: "1px solid indigo" }}>
                      {showInput("Product name", p.name)}
                      {showInput("Product price", p.price)}
                      {showInput("Product total", p.count)}
                      {showInput("Product ID", p._id)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2"></div>
      </div>
    </Layout>
  );
}
