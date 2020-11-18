import React, {Component} from 'react';
import {ShopWrite} from '../../../../Components';

class Home extends Component {
    render() {
        var path = this.props.path
        console.log(path)
        if(path === 'Main') {
            return (
              <>
                <div className='admin-mainContents'>contents</div>
              </>
            )
          } else if(path === 'ShopWrite') {
            return (
                <ShopWrite/>
            )
        }
    }
}

export default Home;
