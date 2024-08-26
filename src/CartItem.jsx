import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const formatCost = (cost) => parseFloat(cost).toFixed(2);

    const calculateTotalAmount = () => {
        let totalAmount = 0;
        cart.forEach(item => {
            const cost = parseFloat(item.cost.replace('$', ''));
            totalAmount += cost * item.quantity;
        });
        return formatCost(totalAmount);
    };

    const calculateTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

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

    const calculateTotalCost = (item) => {
        const cost = parseFloat(item.cost.replace('$', ''));
        return formatCost(cost * item.quantity);
    };

    const handleCheckout = () => {
        alert("Coming soon...");
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map(item => (
                        <div className="cart-item" key={item.id}>
                            <img className="cart-item-image" src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                                <div className="cart-item-name">{item.name}</div>
                                <div className="cart-item-cost">${formatCost(item.cost.replace('$', ''))}</div>
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
                                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                                <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={handleCheckout}>Checkout</button>
            </div>
            <div className="cart-summary">
                <div className="total-items">Total Items: {calculateTotalQuantity()}</div>
            </div>
        </div>
    );
};

export default CartItem;






