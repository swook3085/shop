import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Contents extends Component{
  render() {
    return (
        <div className='main-wrap'>
            <div className='contents'>
                <div className='mainrow'>
                    <div className='maincol'>
                        <div className='notice-wrap'>
                            <div className='notice'>
                                <div className='notice-header'>
                                    <div className='notice-title'>
                                        <h3>공지사항</h3>
                                    </div>
                                    <div className='notice-more'>
                                        <NavLink to ="/">+more</NavLink>
                                    </div>
                                </div>
                                <div className='notice-body'>
                                    <ul>
                                        <li><NavLink to ="/">감 재입고 되었습니다.</NavLink></li>
                                        <li><NavLink to ="/">2019년 감 품절되었습니다.</NavLink></li>
                                        <li><NavLink to ="/">직접 농사지어 배달까지 책임집니다</NavLink></li>
                                        <li><NavLink to ="/">홈페이지 오픈 했습니다.</NavLink></li>
                                        <li><NavLink to ="/">추석 선물세트 예약 받습니다.</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='maincol'>
                        <div className='notice-wrap'>
                            <div className='notice'>
                                <div className='notice-header'>
                                    <div className='notice-title'>
                                        <h3>구매후기</h3>
                                    </div>
                                    <div className='notice-more'>
                                        <NavLink to ="/">+more</NavLink>
                                    </div>
                                </div>
                                <div className='notice-body'>
                                    <ul>
                                        <li><NavLink to ="/">감이 맛있어요</NavLink></li>
                                        <li><NavLink to ="/">배달도 빠르고 맛있어요</NavLink></li>
                                        <li><NavLink to ="/">다음에 또 주문할게요~</NavLink></li>
                                        <li><NavLink to ="/">추석 선물로 드렸는데 굿굿</NavLink></li>
                                        <li><NavLink to ="/">맛있어요!!</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mainrow'>
                    <div className='maincol'>sm=4</div>
                </div>
            </div>
        </div>
    )
  }
}

export default Contents;
