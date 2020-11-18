import React, {Component} from 'react';
import './intro.css';


class Intro extends Component{
  render() {
    return (
      <>
        <div className='main-contents'>
          <div className='intro-left'>
            <p className='introText'>농장 소개</p>
            <div className='intro-left-content'>
              <div className='intro-left-img'></div>
              <div className='intro-left-text'>
                <p>
                  저희 농원은 야산 비탈진곳 남향이라 하루종일 볕이 골고루 들어 맛있는 감을 재배할 수 있는 최적의 장소입니다.<br/>
                  내 식구, 내 가족이 먹는다는 생각으로 사과를 선별해서 고객님께 보내드립니다.<br/>
                  "이런 감 보내면 좋아하겠습니까" 제가 직원들에게 자주 하는 말입니다.<br/>
                  깐깐하게 정직하게 농사짓고 있습니다.<br/>
                  내 감을 구매하시는 분들이 즐거워하는 모습을 생각하며 매년 농사 짓습니다.
                </p>
              </div>
            </div>
          </div>
          <div className='intro-right'>
            <p className='introText'>오시는 길</p>
            <div className='intro-right-content'>
              <div className='intro-right-text'>
                  <p>
                    제주특별자치도 제주시 한림읍 월령3길 30-2
                  </p>
              </div>
              <div className='intro-right-img'></div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Intro;
