import React from 'react';
import './Order.css';
import '../Burger/Burger.css';


const order = (props) => {

    //transform ingredients to string
const ingredients = [];

for (let ingredientName in props.ingredients) {
    ingredients.push(
        {
        name: ingredientName, 
        amount: props.ingredients[ingredientName]
    });
}

const ingredientOutput = ingredients.map(ig => {
    return <span 
    style={{textTransform: 'capitalize',
display: 'inline-block',
margin: '0 8 px',
padding: '5px'}}
    key={ig.name}>{ig.name} ({ig.amount})</span>;
});

    return(
        <div className="Order">
        <p>Toppings: {ingredientOutput}</p>

        <p>Price: {Number.parseFloat(props.price).toFixed(2)}</p>
    </div>
    );
  
};
export default order; 