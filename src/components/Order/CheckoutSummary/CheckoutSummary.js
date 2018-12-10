import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';
import '../../Burger/Burger.css';
import Aux from '../../../hoc/Aux';

const checkoutSummary = (props) => {

    let continueButton = <Button 
    btnType="Success"
    clicked={props.checkoutContinued}>Continue<i className="fas fa-arrow-right" style={{paddingLeft: '15px'}}></i></Button>;

    let continuedButton = <Button 
    disabled
    btnType="Success"
    clicked={props.checkoutContinued}>Continued</Button>;

    
return (

    <Aux> 
<div className="BurgerContainer">

        <Burger ingredients={props.ingredients}/>
        </div>
            <div className="CheckoutSummary">
        <h2>That Looks Delicious!</h2>
        <p>Do you want to order this burger?</p>
    <Button 
      
        btnType="Danger"
        clicked={props.checkoutCancelled}><i className="fas fa-arrow-left"></i></Button>
   
   
   {props.disabled ? continuedButton : continueButton}
   
</div>
</Aux>

 


);
}

export default checkoutSummary;