import React, {Component} from 'react';
import {Main, Intro, Shop, Shopinfo, Header, Footer, AdminContent} from '../Components';
import { getStatusRequest } from '../Redux/Action/index';
import { connect } from 'react-redux';

class Home extends Component{
  componentDidMount() {        
    function getCookie(name) {
      var value = '; ' + document.cookie;
      var parts = value.split('; ' + name + '=');
      if(parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    }

    let loginData = getCookie('key');

    if(typeof loginData === "undefined") return;
    loginData = JSON.parse(atob(loginData));
    if(!loginData.isLoggedIn) return;
    this.props.getStatusRequest().then(
      () => {
        if(!this.props.status.status.valid) {
          loginData = {
            isLoggedIn:false,
            id:''
          };
          document.cookie='key=' + btoa(JSON.stringify(loginData));
          console.log('세션 만료');
        }
      }
    )
  }
  render() {
    const path = this.props.path;
    console.log(path)
    if(path === undefined) {
      return (
        <>
          <Header/>
          <Main/>
          <Footer/>
        </>
      )
    } else if(path === 'Intro') {
      return (
        <>
          <Intro/>
        </>
      )
    } else if(path === 'Shop') {
      return (
        <>
          <Shop match={this.props.match}/>
        </>
      )
    } else if(path === 'ShopInfo') {
      return (
        <>
          <Shopinfo match={this.props.match}/>
        </>
      )
    } else if(path === 'Admin') {
      return (
        <AdminContent match={this.props.match}/>
      )
    }
  }
}
const mapStateToProps = (state) => {
  return {
    status: state
  };
}

const mapDispatchToProps = (dispatch) => {
// return bindActionCreators(actions, dispatch);
return {
  getStatusRequest: () => {
  return dispatch(getStatusRequest());
  }
}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
