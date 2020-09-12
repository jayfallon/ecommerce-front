import React from "react";
import "../style.css";

export default function Layout({
  title = "Title",
  description = "Description",
  className,
  children,
}) {
  return (
    <React.Fragment>
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </React.Fragment>
  );
}
