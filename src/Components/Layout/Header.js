import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutRequest, hideModal, showModal, registerHideModal, registerShowModal} from '../../Redux/Action/index';
import './header.css';
import Modal from '../Pages/Auth/Modal';

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      mbMenuActive : false,
    }
  }
  mobildActive = (e) => {
    this.setState({
      mbMenuActive:!this.state.mbMenuActive
    })
  }
  handleLogout = () => {
    return this.props.logoutRequest().then(
      () => {
        
      });
  };

  render() {
    return (
      <>
        <div className='header'>
            <div className='subMenu'>
              <ul>
                {this.props.status.status.isLoggedIn ? <li onClick={this.props.logoutRequest} className='logout'>로그아웃</li> :
                <>
                <li className='login' onClick={this.props.showModal}>로그인</li>
                <li className='register' onClick={this.props.registerShowModal}>회원가입</li>
                </>
                }
                <li><NavLink to ="/Login">장바구니</NavLink></li>
                <li><NavLink to ="/Login">주문조회</NavLink></li>
                <li><NavLink to ="/Login">마이쇼핑</NavLink></li>
                <li><NavLink to ="/Login">1:1문의</NavLink></li>
              </ul>
            </div>
            <div className='mainMenu'>
              <div className='navWrap'>
                <div className='logoWrap'>
                  <h1 className='logo'>
                    <NavLink to ="/">
                      Project
                    </NavLink>
                  </h1>
                </div>
                <div className='menuWrap'>
                  <h2 onClick={this.mobildActive}>MENU</h2>
                </div>
                <div className='pc-menuWrap'>
                  <ul>
                    <li><NavLink to ="/Intro">감농장</NavLink></li>
                    <li><NavLink to ="/Shop">쇼핑몰</NavLink></li>
                    <li><NavLink to ="/">구매후기</NavLink></li>
                    <li><NavLink to ="/">고객센터</NavLink></li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
        <div className={this.state.mbMenuActive ? 'mb-bg mb-menuWrapActiveBg' : 'mb-bg mb-menuWrapBg'} onClick={this.mobildActive}>

        </div>
        <div className={this.state.mbMenuActive ? 'mb-menu mb-menuWrapActive' : 'mb-menu mb-menuWrap'}>
          <ul>
            <li><NavLink to ="/Intro">감농장</NavLink></li>
            <li><NavLink to ="/Shop">쇼핑몰</NavLink></li>
            <li><NavLink to ="/">구매후기</NavLink></li>
            <li><NavLink to ="/">고객센터</NavLink></li>
          </ul>
        </div>
        <Modal/>
      </>
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
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
    hideModal: () => dispatch(hideModal()),
    showModal: () => dispatch(showModal()),
    registerHideModal: () => dispatch(registerHideModal()),
    registerShowModal: () => dispatch(registerShowModal())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

