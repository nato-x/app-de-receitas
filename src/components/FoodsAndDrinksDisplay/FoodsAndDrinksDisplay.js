import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './FoodsAndDrinksDisplay.style.css';
import RecipeContext from '../../Context/RecipeContext';

const firstKey = (obj) => obj !== null && Object.keys(obj)[0];

const renderGrid = (recipe, stringObject, imgDisplay) => (
  <div className="item-overflow">
    {recipe[firstKey(recipe)].map(
      (el, index) =>
        index < 12 && (
          <Link
            className="container-display"
            key={el[stringObject]}
            data-testid={`${index}-recipe-card`}
            to={
              (firstKey(recipe) === 'meals' && `/comidas/${el.idMeal}`) ||
              (firstKey(recipe) === 'drinks' && `/bebidas/${el.idDrink}`)
            }
          >
            <img
              className="img-display"
              data-testid={`${index}-card-img`}
              src={el[imgDisplay]}
              alt={`${el[stringObject]}`}
            />
            <h3 data-testid={`${index}-card-name`}>{el[stringObject]}</h3>
          </Link>
        ),
    )}
  </div>
);

const FoodsAndDrinksDisplay = (getitemDefined, stringObject, imgDisplay) => {
  const {
    valueToFilter,
    objectReturnedAfterReq,
    setObjectReturnedAfterReq,
    showSearchBar,
  } = useContext(RecipeContext);

  useEffect(() => {
    functionToMakeRequisition();
  }, [valueToFilter]);

  useEffect(() => () => {
    showSearchBar(false);
  }, []);
  
  const functionToMakeRequisition = async () => {
    if (valueToFilter === 'All') return setObjectReturnedAfterReq(await getitemDefined());
    return alert(`mudei o filtro para: ${valueToFilter}`);
  };


  const renderDisplay = () => {
    switch (true) {
      case objectReturnedAfterReq === null:
        return null;
      case objectReturnedAfterReq[firstKey(objectReturnedAfterReq)] === null:
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      default:
        return renderGrid(objectReturnedAfterReq, stringObject, imgDisplay);
    }
  };
  return renderDisplay();
};

export default FoodsAndDrinksDisplay;
