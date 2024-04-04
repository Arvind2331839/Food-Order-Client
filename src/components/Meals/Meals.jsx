import React from 'react';
import useHTTP from '../../hooks/useHTTP';
import MealItem from './MealItem';
import Error from '../Error';

// Define request configuration for fetching meals
const requestConfig = {};

export default function Meals() {
  // Fetch meals using custom hook useHTTP
  const { data: mealList, isLoading, error } = useHTTP('https://food-order-server.onrender.com/meals', requestConfig, []);

  // Display loading message while fetching meals
  if (isLoading) {
    return <p className="fetching-meals"> Fetching Meals... 🍴 </p>;
  }

  // Display error message if fetching meals fails
  if (error) {
    return <Error title="Failed To Fetch Meals ⛔" message={error} />;
  }

  // Display message if no meals are found
  if (!mealList) {
    return <p className="no-meals"> No Meals Found 🔍 </p>;
  }

  // Render list of meals if available
  return (
    <ul id="meals">
      {mealList.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
