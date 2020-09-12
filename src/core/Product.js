import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { read, listRelated } from "./apiCore";

export default function Product(props) {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    console.log({ productId });
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
            console.log({ setRelatedProduct });
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }>
      <div className="container">
        <div className="row">
          <div className="col-8">
            {product && product.description && (
              <Card product={product} showViewProductButton={false} />
            )}
          </div>
          <div className="col-4">
            <h4>Related Products</h4>
            {relatedProduct.map((p, i) => {
              return (
                <div className="mb-3" key={i}>
                  <Card product={p} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
