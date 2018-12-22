import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label:'Meat', type:'meat'},
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
];

const buildControls = (props) => (

    <div className="BuildControls">
   
    <p className="totalPrice"><p className="ControlTitle">Ingredients</p> <strong> {props.price.toFixed(2)} <i className="fab fa-ethereum "></i> </strong></p>
{controls.map(ctrl => (
     <BuildControl 
     key={ctrl.label} 
     label={ctrl.label} 
     disabled={props.disabled[ctrl.type]}
     added={() => props.ingredientAdded(ctrl.type)}
     removed={() => props.ingredientRemoved(ctrl.type)}
     ingredientCount={props.ingredients[ctrl.type]}
     />
    ))}
    <button 
    className="OrderButton"
    disabled={!props.purchasable}
    onClick={props.ordered}>{props.isAuth ? 'Proceed to Checkout' : 'Login to Proceed'}</button>
    </div>
);

export default buildControls;