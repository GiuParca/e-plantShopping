import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

import snakePlantImg from './images/snake-plant.jpg';
import monsteraImg from './images/monstera-adansonii.jpg';
import peaceLilyImg from './images/peace-lily.jpg';
import bostonFernImg from './images/boston-fern.jpg';
import aloeVeraImg from './images/aloe-vera.jpg';
import peppermintImg from './images/peppermint.jpg';
import jasmineImg from './images/jasmine.jpg';
import lavenderImg from './images/lavender.jpg';
import rosemaryImg from './images/rosemary.jpg';
import basilImg from './images/basil.jpg';
import chamomileImg from './images/chamomile.jpg';
import marigoldImg from './images/marigold.jpg';
import geranimusImg from './images/geraniums.jpg';
import oreganoImg from './images/oregano.jpg';
import echinaceaImg from './images/echinacea.jpg';

function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(true);
    const [addedToCart, setAddedToCart] = useState({});

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { id: 1, name: "Snake Plant", image: snakePlantImg, description: "Produces oxygen, improves air quality.", cost: "$15" },
                { id: 2, name: "Monstera adansonii", image: monsteraImg, description: "Absorbs toxins, releases fresh oxygen.", cost: "$12" },
                { id: 3, name: "Peace Lily", image: peaceLilyImg, description: "Removes mold spores, purifies the air.", cost: "$18" },
                { id: 4, name: "Boston Fern", image: bostonFernImg, description: "Adds humidity and removes toxins.", cost: "$20" }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { id: 5, name: "Lavender", image: lavenderImg, description: "Calming scent, used in aromatherapy.", cost: "$20" },
                { id: 6, name: "Jasmine", image: jasmineImg, description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
                { id: 7, name: "Rosemary", image: rosemaryImg, description: "Invigorating scent, popular in cooking.", cost: "$15" },
                { id: 8, name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma, also used in teas.", cost: "$12" }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                { id: 9, name: "Oregano", image: oreganoImg, description: "Can deter insects and certain pests.", cost: "$10" },
                { id: 10, name: "Marigold", image: marigoldImg, description: "The smell is a good fly-repellent plant.", cost: "$8" },
                { id: 11, name: "Geraniums", image: geranimusImg, description: "Insect-repelling properties.", cost: "$20" },
                { id: 12, name: "Basil", image: basilImg, description: "Repels flies and mosquitoes.", cost: "$9" }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                { id: 13, name: "Aloe Vera", image: aloeVeraImg, description: "Soothing gel used for skin ailments.", cost: "$14" },
                { id: 14, name: "Peppermint", image: peppermintImg, description: "Relieves digestive issues, headaches.", cost: "$13" },
                { id: 15, name: "Chamomile", image: chamomileImg, description: "Soothes anxiety and promotes sleep.", cost: "$15" },
                { id: 16, name: "Echinacea", image: echinaceaImg, description: "Treatment for cold and other infections.", cost: "$9" }
            ]
        }
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };

    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
        setShowPlants(false);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
        setShowPlants(true);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.id]: true,
        }));

        setTimeout(() => {
            setAddedToCart((prevState) => ({
                ...prevState,
                [product.id]: false,
            }));
        }, 2000);
    };

    return (
        <div>
            <div id="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <img id='logo' src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Eco Logo" />
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div className='link-nav'>
                        <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>
                    </div>
                    <div className="cart-container">
                        <a href="#" onClick={handleCartClick} style={styleA}>
                            <h1 className='cart'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="50" width="50">
                                    <rect width="50" height="50" fill="#fff"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                </svg>
                                <span className="cart-quantity-bubble">{totalQuantity}</span>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1 className="category-title">{category.category}</h1>
                            <div className='product-list'>
                                {category.plants.map((plant) => (
                                    <div className='product-cart' key={plant.id}>
                                        <img className='product-image' src={plant.image} alt={plant.name} />
                                        <div className='product-title'>{plant.name}</div>
                                        <div className='product-description'>{plant.description}</div>
                                        <div className='product-price'>{plant.cost}</div>
                                        <button
                                            className={`product-button ${addedToCart[plant.id] ? 'added' : ''}`}
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {addedToCart[plant.id] ? 'Added!' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;



