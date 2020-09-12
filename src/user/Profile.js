import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";

export default function Profile({ match }) {
  const [values, setValues] = useState({
    name: "",
    error: "",
    success: false,
  });

  const { token } = isAuthenticated();

  const { name, password, error, success } = values;

  const init = (userId) => {
    // console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, password }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        updateUser(data, () => {
          setValues({ ...values, name: data.name, success: true });
        });
      }
    });
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const profileUpdate = () => {
    return (
      <form className="container">
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            value={name}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            onChange={handleChange("password")}
            value={password}
            className="form-control"
          />
        </div>
        <button className="btn-primary btn" onClick={clickSubmit}>
          Submit
        </button>
      </form>
    );
  };

  return (
    <Layout title="Profile" description="Hey there">
      <h2>Profile</h2>
      {profileUpdate(name, password)}
      {redirectUser(success)}
    </Layout>
  );
}
