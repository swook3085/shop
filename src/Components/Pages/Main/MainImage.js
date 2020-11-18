import React, {Component} from 'react';

class MainImage extends Component{
  render() {
    return (
        <div className='mainImage-wrap'>
          <div className='mainImage'></div>
           <div className='mainText-wrap'>
              <div className='mainText'>
                <p><span>자연과 사람</span>이 공존하는<br/>아름답고 깨끗한 세상을 만듭니다</p>
              </div>
           </div>
           <div className="scroll-downs">
            <div className="mousey">
                <div className="scroller"></div>
            </div>
          </div>
        </div>
    )
  }
}
// if(res[i].Todo_startTime.indexOf($('.timeLine').val()) != -1) 
export default MainImage;
