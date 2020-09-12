import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";
import Layout from "../core/Layout";
import { getProducts, deleteProduct } from "./apiAdmin";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout title={"Manage Products"} description={"Perform CRUD on products"}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">Total products: {products.length}</h2>
            <hr />
            <ul className="list-group">
              {products.map((product, i) => {
                return (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>{product.name}</strong>
                    <Link to={`/admin/product/update/${product._id}`}>
                      <span className="badge badge-warning badge-pill">
                        Update
                      </span>
                    </Link>
                    <span
                      onClick={() => destroy(product._id)}
                      className="badge badge-danger badge-pill">
                      Delete
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
