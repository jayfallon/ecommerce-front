import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Shop from "./core/Shop";
import Cart from "./core/Cart";
import Product from "./core/Product";
import Menu from "./core/Menu";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";

export default function Routes() {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute path="/user/dashboard" component={Dashboard} />
        <PrivateRoute path="/profile/:userId" component={Profile} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute path="/create/category" component={AddCategory} />
        <AdminRoute path="/create/product" component={AddProduct} />
        <AdminRoute path="/admin/products" component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          component={UpdateProduct}
        />
        <Route exact path="/product/:productId" component={Product} />
        <Route exact path="/cart" component={Cart} />
        <AdminRoute path="/admin/orders" component={Orders} />
      </Switch>
    </Router>
  );
}
