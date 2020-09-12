import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

export default function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout title={"Home Page"} description={"Node JS App"}>
      <Search />
      <div className="container">
        <h2 className="mb-4">New Arrivals</h2>
        <div className="row">
          {productsByArrival.map((p, i) => {
            return <Card key={i} product={p} />;
          })}
        </div>
        <h2 className="mb-4">Best Sellers</h2>
        <div className="row">
          {productsBySell.map((p, i) => {
            return (
              <div key={i} className="col-4 mb-3">
                <Card product={p} />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
