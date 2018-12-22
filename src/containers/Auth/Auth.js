import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import  './Auth.css';
import Web3 from 'web3';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../store/utility';

let web3 = null; // Will hold the web3 instance


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true,
        loading: false,
        users: {
            name:'',
            address:''
        },
    }

    componentDidMount () {
        if ( !this.props.buildingBurger && this.props.authRedirectPath !== '/' ) {
            this.props.onSetAuthRedirectPath();
        }
    }

   
    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }



       // METAMASK LOGIN

   
    // handleAuthenticate = ({ publicAddress, signature }) =>


    // fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
    //   body: JSON.stringify({ publicAddress, signature }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST'
    // }).then(response => response.json());

  handleClick = () => {
 

    if (!window.web3) {
      window.alert('Please install MetaMask first.');
      return;
    }
    if (!web3) {
      // We don't know window.web3 version, so we use our own instance of web3
      // with provider given by window.web3
      web3 = new Web3(window.web3.currentProvider);
    }
    if (!web3.eth.coinbase) {
      window.alert('Please activate MetaMask first.');
      return;
    }
    const publicAddress = web3.eth.coinbase.toLowerCase();
    const nonce = Math.random();  
    this.setState({ loading: true });
   

    // Look if user with current publicAddress is already present on backend

    axios.get('/users.json')

      .then(response => {

      })
      // If yes, retrieve it. If no, create it.
      .then(
        this.handleSignup(publicAddress)
      
      )

    
      // Popup MetaMask confirmation modal to sign message
      .then(
 
        this.handleSignMessage(publicAddress, nonce))
      // Send signature to backend on the /auth route
    //   .then(this.handleAuthenticate)

      // Pass accessToken back to parent component (to save it in localStorage)
    //   .then(onLoggedIn)
    .then (response =>   this.props.history.push( '/' ))
      .catch(err => {
        window.alert(err);
      
        this.setState({ loading: false });
      
      });
    
  };

  handleSignMessage = (publicAddress, nonce ) => {
    return new Promise((resolve, reject) =>
      web3.personal.sign(
        web3.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
        publicAddress,
        (err, signature) => {
          if (err) return reject(err);
          return resolve({ publicAddress, signature });
      
        }
      )

    );
  
  };

handleSignup = ( publicAddress ) => {

    this.setState( { loading: true } );
    
 
    const user = {
        address: publicAddress,
        name: ''
    }
       
    axios.post( '/users.json', user )
        .then( response => {
            this.setState( { loading: true } );
   
        
        } )
        .catch( error => {
            this.setState( { loading: false } );
        } );
}

inputChangedHandler = ( event, controlName ) => {
    const updatedControls = updateObject( this.state.controls, {
        [controlName]: updateObject( this.state.controls[controlName], {
            value: event.target.value,
            valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
            touched: true
        } )
    } );
    this.setState( { controls: updatedControls } );
}

submitHandler = ( event ) => {
    event.preventDefault();
    this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
}

switchAuthModeHandler = () => {
    this.setState( prevState => {
        return { isSignup: !prevState.isSignup };
    } );
}


    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

   


        let metaMask = (  <Button
            clicked={this.handleClick}
            btnType="Danger">Login with MetaMask<img style={{height: '15px',
        marginLeft: '10px'}}
            src='https://metamask.io/img/metamask.png'></img></Button> );

        let loadingMetaMask = ( <Button 
            
            btnType="Danger">Verifying MetaMask<img style={{height: '15px',
        marginLeft: '10px'}}
            src='https://metamask.io/img/metamask.png'></img></Button> );

      

        return (
            <div className="LoginBg">
          <div className='Auth'>

              {authRedirect}
       
         <p className="LoginTitle">
         Welcome to ReactBurger
         </p>

                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button  btnType="Success LoginBtn">Sign In</Button>
                </form>
<p className="LoginOR">OR</p>
              

                     {this.state.loading ? loadingMetaMask : metaMask }

   <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>



            </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );