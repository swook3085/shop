import React, {Component} from 'react';
import {NavLink } from 'react-router-dom';
import {numberWithCommas} from '../../../Util/Util';
// import CircularProgress from '@material-ui/core/CircularProgress';
import './shop.css';

class Shop extends Component{
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      completed : 0,
      pageSize: 10,    // 한페이지에 보일 게시물
      totalCount: 0,  // 게시물 총 개수
      currentPage: 1, // 현재페이지
      start : 0,      // 게시물 자를 첫 번호
      end : 10         // 게시물 자를 마지막 번호
    }
  }
  componentDidMount() {
    this._isMounted = true;
    this.timer = setInterval(this.progress, 20);
    this.shopListCallApi()
      .then(res => {
        if (this._isMounted) {
          this.setState({
            data: res.data,
          });
          this.page();
        }
      })
      .catch(err => console.log(err));
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this._isMounted = false;
  }
  shopListCallApi = async () => {
    const response = await fetch('http://192.168.0.17:5000/api/Shoplist');
    const body = await response.json();
    return body;
  }
 
  shopListRender = () => {
    // 역순 정렬 3,2,1
    const datasort = this.state.data.sort(function (a, b) { 
      return a.id > b.id ? -1 : a.id < b.id ? 1 : 0;  
    });
    const shopdata = datasort.slice(this.state.start,this.state.end);
    return shopdata.map((data) => {
      return (
        <li key={data.id}>
          <div className='listImgWrap'>
            <NavLink to={`ShopInfo/${data.id}`}>
              <img src={window.location.origin + '/Upload/' + data.miFileName} alt='대표이미지'/>
            </NavLink>
          </div>
          <div className='listTextWrap'>
            <NavLink to={`ShopInfo/${data.id}`}>{data.product_name}</NavLink>
            {data.supply_price !== '0' ? <p className='userPrice'>{numberWithCommas(data.user_price)} 원</p> : <p className='userPrice'>{numberWithCommas(data.product_price)} 원</p>}
            <p className='listPrice'>{numberWithCommas(data.product_price)} 원</p>
          </div>
        </li>
      )
    })
  }

  page = () => {
    this.setState({
      totalCount : this.state.data.length
    })
  }

  pageRender = () => {
    const total = Math.ceil(this.state.totalCount/this.state.pageSize);
    const paging = [];
    for(let i = 0;i < total;i++) {
      paging.push(i + 1);
    }
    return paging.map((page, index) => {
      return (
        page === this.state.currentPage ? 
        <button className='activePage' key={index} value={page} disabled>{page}</button>
        :
        <button key={index} value={page} onClick={this.handleChangeIndexPage}>{page}</button>
      )
    });
  }

  // 현재 페이지 클릭
  handleChangeIndexPage = (e) => {
    var currPage = Number(e.target.value);
    if(currPage !== 1) {
      this.setState({
        currentPage : currPage,
        start : (currPage * this.state.pageSize) - this.state.pageSize,
        end : currPage * this.state.pageSize
      })
    } else {
      this.setState({
        currentPage : currPage,
        start : 0,
        end : currPage * this.state.pageSize
      })
    }
  }
  // 다음 페이지
  handleChangeIndexUp = () => {
    if(this.state.currentPage === Math.ceil(this.state.totalCount/this.state.pageSize)) {
      alert('마지막 페이지입니다.');
      return;
    }
    this.setState({
      currentPage : this.state.currentPage + 1,
      start : this.state.start  + this.state.pageSize,
      end : this.state.end + this.state.pageSize
    })
  }
  // 이전 페이지
  handleChangeIndexDown = () => {
    if(this.state.start === 0) {
      alert('처음 페이지입니다.');
      return;
    }
    this.setState({
      currentPage : this.state.currentPage - 1,
      start : this.state.start  - this.state.pageSize,
      end : this.state.end - this.state.pageSize
    })
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({completed : completed >= 100 ? 0 : completed + 1});
  }

  render() {
    return (
      <>
      <div className='main-contents'>
        <div className='shoh-wrap'>
          <div className='shoplist'>
            <ul>
              {this.shopListRender()}
            </ul>
          </div>
          {/* <table>
            <thead>
              <tr>
                  <td>제목</td>
                  <td>작성자</td>
                  <td>작성일</td>
              </tr>
            </thead>
            <tbody>
            {
            this.state.data.length !== 0 ? 
              this.shopListRender() :
              <tr>
                <td colSpan="3">
                  <CircularProgress  variant="determinate" value={this.state.completed}/>
                </td>
              </tr>
            }
            </tbody>
          </table> */}
        </div>
        <NavLink to ="/Admin/ShopWrite">작성</NavLink>
        <div className="pagingWrap">
          <button onClick={this.handleChangeIndexDown}>이전</button>
          {this.pageRender()}
          <button onClick={this.handleChangeIndexUp}>다음</button>
        </div>
        <div>
          <h1>start : {this.state.start}</h1>
          <h1>end : {this.state.end}</h1>
          <h1>currentPage : {this.state.currentPage}</h1>
          <h1>total : {Math.ceil(this.state.totalCount/this.state.pageSize)}</h1>
        </div>
      </div>
      </>
    )
  }
}

export default Shop;
