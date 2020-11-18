import React, {Component} from 'react';
import MainImage from './MainImage';
import Contents from './Contents';
import './Main.css';

class Main extends Component{
  render() {
    return (
      <>
        <MainImage/>
        <Contents/>
      </>
    )
  }
}

export default Main;
