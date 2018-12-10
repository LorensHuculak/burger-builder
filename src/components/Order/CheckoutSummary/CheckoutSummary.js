import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const checkoutSummary = (props) => {
return (
    <div className="CheckoutSummary">
    <h1>Enjoy your Burger!</h1>
    <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
    </div>
    <Button 
        btnType="Danger"
        clicked={props.checkoutCancelled}><i className="fas fa-arrow-left"></i></Button>
    <Button 
        btnType="Success"
        clicked={props.checkoutContinued}>Continue</Button>
</div>

 


);
}

export default checkoutSummary;