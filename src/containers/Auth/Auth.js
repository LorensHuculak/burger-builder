import React, { Component } from 'react';


import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import  './Auth.css';
import Helpers from '../../store/cookies';
import Aux from '../../hoc/Aux';
import Web3 from 'web3';
import axios from '../../axios-orders';

let web3 = null; // Will hold the web3 instance


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
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
        users: null,
    }

    // componentDidMount() {
    //     if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
    //         this.props.onSetAuthRedirectPath();
    //     }
    // }

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

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }



    // signMessage = () => {
    //     let message = "testMessage";
    //     if (window.web3){
    //         var userEthereumClient = window.web3;
    //         // sign a message
    //         userEthereumClient.eth.sign(
    //             userEthereumClient.eth.coinbase,  // pass the user's public key
    //             window.web3.sha3(message),  // pass a sha hash of a message
    //             function(error, data) {  // pass a callback
    //                 if (error){
    //                     console.log("An error occured while signing the message.");
    //                 } else {
    //                     Helpers.setCookie("signedAuthMessage", data, 2);
    //                     if(Helpers.getCookie("signedAuthMessage")){
    //                         console.log("You successfully stored the signed message.");
    //                     } else {
    //                         console.log("You did not successfully store the signed message.");
    //                     };
    //                 };
    //             });
    //     } else {
    //         console.log(">> You cannot sign the message because Web 3 is not loaded");
    //     };
    // }


    // METAMASK LOGIN

   

    handleAuthenticate = ({ publicAddress, signature }) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());

  handleClick = () => {
    const { onLoggedIn } = this.props;

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
    this.setState({ loading: true });

    // // Look if user with current publicAddress is already present on backend
    fetch(
      `${
        process.env.REACT_APP_BACKEND_URL
      }/users?publicAddress=${publicAddress}`
    )
    //   .then(response => response.json())
      // If yes, retrieve it. If no, create it.
      .then(
        users => (users.length ? users[0] : this.handleSignup(publicAddress))
      )
      // Popup MetaMask confirmation modal to sign message
      .then(this.handleSignMessage)
      // Send signature to backend on the /auth route
      .then(this.handleAuthenticate)
      // Pass accessToken back to parent component (to save it in localStorage)
      .then(onLoggedIn)
      .catch(err => {
        window.alert(err);
        this.setState({ loading: false });
      });
  };

  handleSignMessage = () => {
    web3 = new Web3(window.web3.currentProvider);
    const publicAddress = web3.eth.coinbase.toLowerCase();

    return new Promise((resolve, reject) =>
      web3.personal.sign(
        web3.fromUtf8(`I am signing my one-time nonce: 6243`),
        publicAddress,
        (err, signature) => {
          if (err) return reject(err);
          return resolve({ publicAddress, signature });
        }
      )
    );
  };

 

//   handleSignup = publicAddress =>
//     fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
//       body: JSON.stringify({ publicAddress }),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'POST'
//     }).then(response => response.json());


handleSignup = ( event ) => {
    event.preventDefault();
    this.setState( { loading: true } );
    
    web3 = new Web3(window.web3.currentProvider);
    const publicAddress = web3.eth.coinbase.toLowerCase();
    const user = {
        address: publicAddress
    }
       
    axios.post( '/users.json', user )
        .then( response => {
            this.setState( { loading: false } );
        
        } )
        .catch( error => {
            this.setState( { loading: false } );
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

        // let authRedirect = null;
        // if (this.props.isAuthenticated) {
        //     authRedirect = <Redirect to={this.props.authRedirectPath}/>
        // }

        let metaMask = (  <Button
            clicked={this.handleSignMessage}
            btnType="Danger">Login with MetaMask<img style={{height: '15px',
        marginLeft: '10px'}}
            src='https://metamask.io/img/metamask.png'></img></Button> );

        let loadingMetaMask = ( <Button 
            
            btnType="Danger">Verifying MetaMask<img style={{height: '15px',
        marginLeft: '10px'}}
            src='https://metamask.io/img/metamask.png'></img></Button> );

      

        return (
          <div className='Auth'>
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




            </div>

        );
    }
}

// const mapStateToProps = state => {
//     return {
//         loading: state.auth.loading,
//         error: state.auth.error,
//         isAuthenticated: state.auth.token !== null,
//         buildingBurger: state.burgerBuilder.building,
//         authRedirectPath: state.auth.authRedirectPath
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
//         onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
//     };
// };

export default Auth;