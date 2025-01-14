import React, { useState } from 'react';
import './style.css';

export default function FoodBox(props) {
  const [quantity, setQuantity] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();

    setQuantity(e.target.value);
  };
  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={props.food.image} alt="food" />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{props.food.name}</strong> <br />
              <small>{props.food.calories} cal</small>
            </p>
          </div>
        </div>
        <div className="media-right">
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="number"
                value={quantity}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="control">
              <button
                className="button is-info"
                onClick={(e) => {
                  props.func(props.food, quantity, e);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
