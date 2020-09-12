import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

export default function Search() {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category }).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div className="container">
        <h2 className="mb-4 mt-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, i) => {
            return <Card key={i} product={product} />;
          })}
        </div>
      </div>
    );
  };

  const searchFrom = () => (
    <form onSubmit={searchSubmit} className="mb-3">
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">Any category</option>
              {categories.map((c, i) => {
                return (
                  <option value={c._id} key={i}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          {" "}
          <button className="input-group-text">Search</button>{" "}
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container">{searchFrom()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
}
