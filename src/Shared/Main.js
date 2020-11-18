import React from 'react';
import Home from './Home';
import {Header, Footer} from '../Components';

const Main = ({match}) => {
  var path = match.params.path;
  if(path === 'Admin') {
    return (
      <>
        <Home path={path} match={match}/>
      </>
  )
  } else {
    return (
      <>
        <Header/>
        <Home path={path} match={match}/>
        <Footer/>
      </>
  )
  }
}
export default Main;