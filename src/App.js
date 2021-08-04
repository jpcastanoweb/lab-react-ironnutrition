import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import foods from './foods.json';
import nanoid from 'nanoid';

import FoodBox from './components/FoodBox';

function App() {
  const [add, setAdd] = useState(false);

  const [foodList, setFoodList] = useState(foods);

  const [searchString, setSearchString] = useState('');

  const [newFood, setNewFood] = useState({
    name: '',
    calories: null,
    image: '',
    quantity: null,
  });

  const [error, setError] = useState(null);
  // CRUD

  const addFood = (e) => {
    e.preventDefault();

    setAdd(true);
  };

  const handleChange = (event) => {
    event.preventDefault();

    console.log('handling new change');

    setNewFood({
      ...newFood,
      [event.target.name]: event.target.value,
    });
  };

  // const handleSearchChange = (event) => {
  //   event.preventDefault();

  //   setSearchString(event.target.value);

  //   console.log(searchString);
  //   // intenta dividirlo en dos funciones, una cambia el texto del form y la otra filtra la lista
  //   // setFoodList(foods);

  //   // const filteredList = foods.filter((food) => {
  //   //   return food.name.includes(searchString);
  //   // });

  //   // setFoodList(filteredList);
  // };

  const addNewFood = (event) => {
    event.preventDefault();

    if (
      !newFood.name.trim() ||
      !newFood.calories.trim() ||
      !newFood.image.trim()
    ) {
      return setError(
        'Escriba algo en el campo de texto. No puede enviarlos vacios'
      );
    }

    setFoodList([
      ...foodList,
      {
        name: newFood.name,
        calories: newFood.calories,
        image: newFood.image,
        quantity: 0,
      },
    ]);

    setNewFood({
      name: '',
      calories: null,
      image: '',
    });

    setAdd(false);
    setError(null);
  };

  const cancelAdd = (event) => {
    event.preventDefault();

    setNewFood({
      name: '',
      calories: null,
      image: '',
    });
    setAdd(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>IronNutrition</h1>
        <input
          name="search"
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
        <button
          onClick={(event) => {
            addFood(event);
          }}
        >
          Add Food
        </button>
        <div>
          {add ? (
            <>
              <form
                onSubmit={(e) => {
                  addNewFood(e);
                }}
              >
                <h3>Add New Food</h3>
                <label>
                  Name:{' '}
                  <input
                    name="name"
                    value={newFood.name}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </label>
                <label>
                  Calories:{' '}
                  <input
                    name="calories"
                    value={newFood.calories}
                    type="number"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </label>
                <label>
                  Image:{' '}
                  <input
                    name="image"
                    value={newFood.image}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </label>
                <button>Submit</button>
              </form>
              <button
                onClick={(e) => {
                  cancelAdd(e);
                }}
              >
                Cancel
              </button>
              {error ? error : null}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="column">
          {foodList
            .filter((food) => {
              return food.name.includes(searchString);
            })
            .map((food) => {
              return <FoodBox food={food}></FoodBox>;
            })}
        </div>
        <div className="column"></div>
      </div>
    </div>
  );
}

export default App;
