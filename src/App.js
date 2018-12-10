import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import LayoutBg from './components/Layout/LayoutBg';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
 
  render() {
    return (
      <div>
     
        <Switch>

<Layout>
<Route path="/orders" component={Orders} />
<Route path="/checkout" component={Checkout} />
<Route path="/" exact component={BurgerBuilder} />
</Layout>
</Switch>
    
      </div>
    );
  }
}

export default App;
