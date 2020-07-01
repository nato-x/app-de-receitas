import React, { useState, useContext } from 'react';
import './SearchBar.style.css';
import * as Api from '../../services/api';
import RecipeContext from '../../Context/RecipeContext';

const filterFoodLogic = async (category, text, setFoodValues) => {
  if (category === 'Ingrediente' && text) {
    return setFoodValues(await Api.getFoodByIngredient(text));
  }
  if (category === 'Nome' && text) {
    return setFoodValues(await Api.getFoodByName(text));
  }
  if (category === 'Primeira letra' && text.length === 1)
    return setFoodValues(await Api.getFoodByFirstLetter(text));
};

const filterDrinkLogic = async (category, text, setDrinkValues) => {
  if (category === 'Ingrediente' && text) {
    return setDrinkValues(await Api.getDrinkByIngredient(text));
  }
  if (category === 'Nome' && text) {
    return setDrinkValues(await Api.getDrinkByName(text));
  }
  if (category === 'Primeira letra' && text.length === 1)
    return setDrinkValues(await Api.getDrinkByFirstLetter(text));
};

const filteredSearch = async (e, currentPath, category, text, setFoodValues, setDrinkValues) => {
  e.preventDefault();
  console.log(text, category, currentPath);
  if (currentPath === '/comidas') {
    return filterFoodLogic(category, text, setFoodValues);
  }
  if (currentPath === '/bebidas') {
    return filterDrinkLogic(category, text, setDrinkValues);
  }
};

const radioBtnDisplay = (className, type, name, id, value, testid, func) => (
  <div>
    <input
      className={className}
      type={type}
      name={name}
      id={id}
      value={value}
      data-testid={testid}
      onClick={func}
    />
    <label htmlFor={id}>{value}</label>
  </div>
);

export default function SearchBar() {
  const { setFoodValues, setDrinkValues } = useContext(RecipeContext);

  const [text, setText] = useState('');
  const [category, setCategory] = useState(null);
  const currentPath = window.location.pathname;

  const saveValues = (e) => setCategory(e.target.value);

  return (
    <div>
      <div>
        <input
          onChange={(e) => setText(e.target.value)}
          className="search-bar"
          data-testid="search-input"
          placeholder="Buscar Receitas"
        />
      </div>
      <div className="search-btn-container">
        <button
          onClick={(e) =>
            filteredSearch(e, currentPath, category, text, setFoodValues, setDrinkValues)
          }
          data-testid="exec-search-btn"
          className="search-btn-display"
          type="submit"
        >
          Buscar
        </button>
      </div>
      <form className="radio-btn-container">
        {radioBtnDisplay( 'radio-btn', 'radio', 'select', 'Ingrediente', 'Ingrediente'
        , 'ingredient-search-radio', saveValues)}
        {radioBtnDisplay( 'radio-btn', 'radio', 'select', 'Nome', 'Nome'
        , 'name-search-radio', saveValues)}
        {radioBtnDisplay( 'radio-btn', 'radio', 'select', 'Primeira letra', 'Primeira letra'
        , 'first-letter-search-radio', saveValues)}
      </form>
    </div>
  );
}
