import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}>
           {props.ingredients[igKey]} <span style={{textTransform: 'capitalize'}}>{igKey}</span>
            </li>;
    });

return(
    <Aux>
    <h3>
       Looks Delicious!
    </h3>
    <p className="paragraph">You have ordered the following toppings</p>
    <ul>
{ingredientSummary}
    </ul>

<p>Burger Price: <strong>{props.price.toFixed(2)} <i className="fab fa-ethereum "></i> </strong></p>


<Button btnType="Danger" clicked={props.purchaseCanceled}><i className="fas fa-arrow-left"></i></Button>
<Button btnType="Success" clicked={props.purchaseContinued }>Order Now</Button>
    </Aux>
);
};

export default orderSummary;