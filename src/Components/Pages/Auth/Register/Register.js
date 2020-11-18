import React, {Component} from 'react';
import Authentication from '../Login/Authentication';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { registerRequest, idCheckRequest} from '../../../../Redux/Action/index';
import './register.css';

class Register extends Component{
  idCheckFunction = (id) => {
    return this.props.idCheckRequest(id).then(
      () => {
        console.log(this.props.status.idCheck.status)
        if(this.props.status.idCheck.status === 'SUCCESS') {
          return true;
        } else {
          return false;
        }
      }
    )
  }
  render() {
    return (
      <div className='register-contents-wrap'>
          <Authentication mode={false} idCheck={this.idCheckFunction}/>
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
      registerRequest: (id, pw) => {
        return dispatch(registerRequest(id,pw));
      },
      idCheckRequest: (id) => {
        return dispatch(idCheckRequest(id));
      }
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
