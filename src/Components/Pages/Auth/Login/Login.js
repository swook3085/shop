import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import Authentication from './Authentication';
import { connect } from 'react-redux';
import { loginRequest, hideModal, registerShowModal } from '../../../../Redux/Action/index';
import './login.css';

class Login extends Component{
  handleLogin = (id, pw) => {
    return this.props.loginRequest(id, pw).then(
      () => {
        console.log(this.props.status.status.isLoggedIn)
        if(this.props.status.login.status === "SUCCESS") {
          // addCookie(id);
          let loginData = {
            isLoggedIn: true,
            id: id
          };
    
          document.cookie = 'key=' + btoa(JSON.stringify(loginData));   
          this.props.hideModal(); //모달창 닫기 
          return true;
        } else {
          return false;
        }
      }
    )
  }
  render() {
    return (
      <div className='contents-wrap'>
          <Authentication mode={true} onLogin={this.handleLogin} registerShowModal={this.props.registerShowModal}/>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    status: state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal()),
    registerShowModal: () => dispatch(registerShowModal()),
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id,pw));
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
