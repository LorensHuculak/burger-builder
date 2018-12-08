import React from 'react';
import Aux from '../../hoc/Aux';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
<Aux>
<Toolbar />
<main className="Content">
    {props.children}
</main>
</Aux>
);

export default layout;