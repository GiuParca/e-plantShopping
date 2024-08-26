import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

// Selectors to retrieve data from the Redux store
const selectTotalCost = (state) => 
  state.cart.items.reduce((total, item) => total + parseFloat(item.cost) * item.quantity, 0);

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const totalCost = useSelector(selectTotalCost); // Use the selector for total cost
  const dispatch = useDispatch();

  const formatCost = (cost) => parseFloat(cost).toFixed(2);

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const calculateTotalCostForItem = (item) => {
    return formatCost(parseFloat(item.cost) * item.quantity);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${formatCost(totalCost)}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${formatCost(item.cost)}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCostForItem(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;





