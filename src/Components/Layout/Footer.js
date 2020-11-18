import React, {Component} from 'react';

class Footer extends Component{
  render() {
    return (
      <div className='footer'>
          <div className='address-wrap'>
            <div className='ad ad-text1'>
              <p>[08505] 서울시 동작구 등용로 9</p>
            </div>
            <div className='ad ad-text2'>
              <p>TEL. 010-0000-0000<span></span>E-MAIL. aaaaa@naver.com</p>
            </div>
            <div className='ad ad-text3'>
              <p>사업자번호 : 000-00-00000<span></span>통신판매업신고번호 : 제 2019-경북청송-00005호</p>
            </div>
            <div className='ad ad-text4'>
              <p>대표 : 홍길동</p>
            </div>
            <div className='ad ad-text5'>
              <p>Copyrightⓒ 2019 KSW. Rights Reserved.</p>
            </div>
          </div>
      </div>
    )
  }
}

export default Footer;
