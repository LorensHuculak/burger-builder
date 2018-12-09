import React, {Component} from 'react';
import CheeseImage from '../../../Layout/ControlImage/CheeseImage';
import MeatImage from '../../../Layout/ControlImage/MeatImage';
import SaladImage from '../../../Layout/ControlImage/SaladImage';
import BaconImage from '../../../Layout/ControlImage/BaconImage';

import './BuildControl.css';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BuildControl extends Component {
    render(){

        let picture = null;
        let ingredientPrice = null;

        switch(this.props.label) {
            case ('Meat'):
            picture = <MeatImage inactive={this.props.disabled}  />;
            ingredientPrice = INGREDIENT_PRICES['meat'];
            break;
            case ('Cheese'):
            picture = <CheeseImage inactive={this.props.disabled} />;
            ingredientPrice = INGREDIENT_PRICES['cheese'];
            break;
            case ('Salad'):
            picture = <SaladImage inactive={this.props.disabled} />;
            ingredientPrice = INGREDIENT_PRICES['salad'];
            break;
            case ('Bacon'):
            picture = <BaconImage inactive={this.props.disabled}/>;
            ingredientPrice = INGREDIENT_PRICES['bacon'];
            break;
            default:
            picture = null;    
        }
    
      

        return(

            <div className="BuildControl">

            {picture}
            
                <div className="Label">{this.props.label}<br />
                <span className="ControlPrice">{ingredientPrice} </span></div>
              
                <button 
                    className="Less" onClick={this.props.removed} disabled={this.props.disabled}>-</button>
        
                <button 
                    className="More" onClick={this.props.added}>+</button>
            </div>


        );
    }
      
    }

    


export default BuildControl;