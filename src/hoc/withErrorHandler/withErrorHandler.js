import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

componentDidMount () {
    axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
    });
    axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
    });
}

errorConfirmedHandler = () => {
    this.setState({error: null})
}

        render () {
            return (
                <Aux>
                <Modal 
                show={this.state.error}
                modalClosed={this.errorConfirmedHandler}
                > 
                  <i style={{marginRight: '20px',
                color: 'red'}}class="fas fa-exclamation-triangle"> </i> {this.state.error ? this.state.error.message : null}
                </Modal>
            <WrappedComponent {...this.props} />
            </Aux>
            );
        }
    } 
}



export default withErrorHandler;