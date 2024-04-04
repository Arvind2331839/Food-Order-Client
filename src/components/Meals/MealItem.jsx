import { useContext } from 'react';
import Button from '../UI/Button';
import CartContext from '../../context/CartContext';

export default function MealItem({ meal }) {
  const { addItem } = useContext(CartContext);

  const handleAddingMeal = () => {
    addItem(meal);
  };

  return (
    <li className="meal-item">
      <article>
        <img src={`https://food-order-server.onrender.com/${meal.image}`} alt={meal.name} />

        <div>
          <h3> {meal.name} </h3>
          <p className="meal-item-price">$ {meal.price}
          </p>
          <p className="meal-item-description"> {meal.description} </p>
        </div>

        <div className="meal-item-actions">
          <Button onClick={handleAddingMeal}>Add to Cart</Button>
        </div>
      </article>
    </li>
  );
}
