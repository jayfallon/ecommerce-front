import React, { useState, useEffect } from "react";

export default function RadioBox({ prices, handleFilters }) {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
      <input
        type="radio"
        className="mr-2 ml-4"
        onChange={handleChange}
        value={`${p._id}`}
        name={p}
      />
      <label className="form-check-label">{p.name}</label>
    </div>
  ));
}
