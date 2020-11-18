import React, {Component} from 'react';
import {post} from 'axios';
import './shop.css';
import {numberCheck, imgCheck} from  '../../../../Util/Util';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

class ShopWrite extends Component{
  constructor(props) {
    super(props)
    this.state = {
      product_name : '', // 상품명
      product_price : '', // 판매가
      supply_price : '', // 공급가
      user_price : '', // 소비자가
      summary_desc : '', // 상품 요약 설명
      product_description : '', // 상품 설명
      product_descriptionImgSrc : '', // 상품 설명 이미지 경로
      mainFile : null, // 대표이미지 File
      mainFileName:'', // 대표이미지 이름
      mainImgSrc:'', // 대표이미지 경로
      addFile : null, // 추가이미지 File배열
      addFileArr : [], // 추가이미지 File배열
      addFileName:'', // 추가이미지 이름
      addFileNameArr : [], // 추가이미지 이름배열
      addImgSrcArr:[], // 추가이미지 경로배열
      exhibition : false, // 진열 상태 체크
      sale : false, // 판매 상태 체크
      mainMouse : false, // 마우스 hover 효과 체크
      modules : { // react quill 에디터 옵션
        toolbar: {
          state : {
            test : ''
          },
          handlers: {
            image: this.imageHandler,
            imageState : this.imageStateChange,
            descriptionImgUpload : this.descriptionImgUpload
          },
          container: [
            ["bold", "italic", "underline", "strike"],
            [{ size: ["small", false, "large", "huge"] }, { color: [] }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
              { align: [] }
            ],
            ["image"]
          ]
        },
        clipboard: { matchVisual: false }
      },
      formats : [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "size",
        "color",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "align"
      ],
      showInfo : true, // 기본정보 접기 체크 
      showState : false, // 상품 상태 접기 체크 
      showDelivery : false, // 배송 상태 접기 체크 
      deliveryWay : '1', // 구매방법 
      deliveryCost : '1', // 구매비 
      deliveryPriceSelect2 : '', // 구매비 설명
      deliveryPriceSelect31 : '', // 구매비 설명
      deliveryPriceSelect32 : '', // 구매비 설명
    }
  }
  imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('value', this.options.state.test)
    input.setAttribute('accept', 'image/,.jpg, .png, .gif');
    input.click();
    input.onchange = async () => {
      console.log(input.value)
      var file = input.files[0];
      console.log('file 정보', file);
      const range = this.quill.getSelection();
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onloadend = () => {
        this.handlers.imageState(file)
        this.handlers.descriptionImgUpload()
        .then((response) => {
          console.log(response.data.filename);
          this.quill.insertEmbed(range.index, 'image', `${window.location.origin}/Upload/${response.data.filename}`); 
          this.quill.setSelection(range.index + 1);
        })
      };
    } // react thing
  }

  productChange = (e) => {
    let nextstate = {};
    nextstate[e.target.name] = e.target.value;
    if(e.target.name === 'product_price' || e.target.name === 'supply_price' || e.target.name === 'user_price' || e.target.name === 'deliveryPriceSelect2'  || e.target.name === 'deliveryPriceSelect31' || e.target.name === 'deliveryPriceSelect32') {
      var temp = e.target.value;
			if(!numberCheck(temp)) {
        this.setState(nextstate);
			} 
    } else {
      this.setState(nextstate);
    }
  }
  mainHandleFileChange = (e) => {
    var fileNm =  e.target.value;
    if (!imgCheck(fileNm)) {
        alert("이미지파일 (.jpg, .png, .gif)만 업로드 가능합니다.");
    } else {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        this.setState({
          mainImgSrc: [reader.result],
        })
      }.bind(this);
      this.setState({
          mainFile : e.target.files[0],
          mainFileName : e.target.value
      })
    }
  }

  imageStateChange = (file) => {
    this.setState({
      product_descriptionImgSrc : file
    })
  }

  addHandleFileChange = (e) => {
    var fileNm =  e.target.value;
    if (!imgCheck(fileNm)) {
        alert("이미지파일 (.jpg, .png, .gif)만 업로드 가능합니다.");
    } else {
      var file = e.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onloadend = function (e) {
        this.state.addImgSrcArr.push([reader.result]);
        this.setState({
          addImgSrcArr: this.state.addImgSrcArr,
        })
      }.bind(this);
      this.state.addFileArr.push(e.target.files[0]);
      this.state.addFileNameArr.push(e.target.value);
      this.setState({
        addFile : e.target.files[0],
        addFileArr :this.state.addFileArr,
        addFileNameArr : this.state.addFileNameArr
      })
    }
  }
  addModifyHandleFileChange = (e, value, index) => {
    var fileNm =  value;
    if (!imgCheck(fileNm)) {
        alert("이미지파일 (.jpg, .png, .gif)만 업로드 가능합니다.");
    } else {
      var file = e.target.files[0];
      console.log(file)
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onloadend = function (e) {
        this.state.addImgSrcArr.splice(index,1,[reader.result])
        this.setState({
          addImgSrcArr: this.state.addImgSrcArr,
        })
      }.bind(this);
      this.state.addFileNameArr.splice(index,1,value)
      this.state.addFileArr.splice(index,1,e.target.files[0])
      this.setState({
        addFile : e.target.files[0],
        addFileArr : this.state.addFileArr,
        addFileNameArr : this.state.addFileNameArr
      })
    }
  }
  mainOnMouseOver = (e) => {
    this.setState({
      mainMouse : true
    })
  }
  mainOnMouseOut = (e) => {
    this.setState({
      mainMouse : false
    })
  }
  mainHandleImgDelete = () => {
    this.setState({
      mainFile : null,
      mainFileName:'',
      mainImgSrc:''
    })
  }
  addHandleImgDelete = (e) => {
      this.state.addFileArr.splice(e.target.value, 1);
      this.state.addImgSrcArr.splice(e.target.value, 1);
      this.state.addFileNameArr.splice(e.target.value, 1);
      this.setState({
        addFile : null,
        addFileArr : this.state.addFileArr,
        addFileName:'',
        addFileNameArr : this.state.addFileNameArr,
        addImgSrcArr:this.state.addImgSrcArr
      })
  }
  handleFormCheck = (e) => {
    if(this.state.product_name === '') {
      alert('상품명 항목은 필수 입력값입니다.');
    } else if(this.state.product_price === '') {
      alert('판매가 항목은 필수 입력값입니다.');
    } else {
      this.handleFormSubmit(e)
    }
  }
  handleFormSubmit = (e) => {
    e.preventDefault()
    this.addShopProduct()
        .then((response) => {
            console.log(response.FormData);
        })
  }
  descriptionImgUpload = () => {
        const url = 'http://192.168.0.17:5000/api/descriptionImg';
        const formData = new FormData();
        formData.append('descriptionImage', this.state.product_descriptionImgSrc);
        const config = {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }
  addShopProduct = () => {
    const url = 'http://192.168.0.17:5000/api/addProduct';
    const formData = new FormData();
    var deliveryCost = this.state.deliveryCost
    var deliveryPrice = '';
    var supply_price = '';
    var user_price = '';

    if(deliveryCost === '2') {
      deliveryPrice = this.state.deliveryPriceSelect2;
    } else if(deliveryCost === '3') {
      deliveryPrice = this.state.deliveryPriceSelect31 + ',' + this.state.deliveryPriceSelect32;
    } else {
      deliveryPrice = 'free';
    }
    if(this.state.supply_price === '') {
      supply_price = '0'
    } else {
      supply_price = this.state.supply_price
    }
    if(this.state.user_price === '') {
      user_price = '0'
    } else {
      user_price = this.state.user_price
    }
    var data = {
      product_name : this.state.product_name,
      product_price : this.state.product_price,
      summary_desc : this.state.summary_desc,
      product_description :this.state.product_description,
      supply_price : supply_price,
      user_price : user_price,
      exhibition : this.state.exhibition,
      sale : this.state.sale,
      deliveryWay : this.state.deliveryWay,
      deliveryCost : this.state.deliveryCost,
      deliveryPrice : deliveryPrice
    }
    formData.append('data', JSON.stringify(data));
    formData.append('mainImage', this.state.mainFile);
    for(var i=0;i<this.state.addFileArr.length;i++) {
      formData.append('addImage', this.state.addFileArr[i]);
    }
    const config = {
        headers : {
            'content-type' : 'multipart/form-data'
        }
    }
    return post(url, formData, config);
  }

  addImgRender = () => {
    return this.state.addImgSrcArr.map((path, index) => {
      return ( 
        <li key={index}>
          <div className='addImage list'>
            <img src={path} alt='추가이미지'/>
            <div className='addImage-btn-wrap'>
              <input className='btn-addImage-change' accept='image/,.jpg, .png, .gif' type='file' onChange={(e) => this.addModifyHandleFileChange(e, this.state.addFileNameArr[index], index)}/>
              <button className='btn-addImage-delete' onClick={this.addHandleImgDelete} value={index}></button>
            </div>
          </div>
        </li>              
      )
     })
  }
  addImgBtnRender = () => {
    if(this.state.addImgSrcArr.length < 20) {
      return (
        <li>
          <div className='addImage'>
            <input className='btn-addImage' name='addImage' accept='image/,.jpg, .png, .gif' type='file' value={this.state.addFileName} file={this.state.addFile} onChange={this.addHandleFileChange}/>
          </div>
        </li>
      )
    }
  }
  
  onEditorStateChange = (editorState) => {
    this.setState({
      product_description : editorState
    });
  };

  onShowInfoChange = (e) => {
    this.setState({
      showInfo : !this.state.showInfo
    });
  };
  onShowStateChange = (e) => {
    this.setState({
      showState : !this.state.showState
    });
  };
  onDeliveryStateChange = (e) => {
    this.setState({
      showDelivery : !this.state.showDelivery
    });
  };
  onExhibitionStateChange = (e) => {
    this.setState({
      exhibition : !this.state.exhibition
    });
  };
  onSaleStateChange = (e) => {
    this.setState({
      sale : !this.state.sale
    });
  };
  onSelect1Change = (e) => {
    this.setState({
      deliveryWay : e.target.value
    })
  };
  onSelect2Change = (e) => {
    this.setState({
      deliveryCost : e.target.value
    })
  };
  select2Render = () => {
    var deliveryCost = this.state.deliveryCost
    if(deliveryCost === '2') {
      return (
        <tr>
          <th className='tdTitle'>배송비</th>
          <td className='tdContent' colSpan='2'>
            구매금액에 상관없이 배송비 <input type="text" name="deliveryPriceSelect2" className='ptext price cost2' value={this.state.deliveryPriceSelect2} onChange={this.productChange}/>원을 부과합니다.
          </td>
        </tr>
      )
    } else if(deliveryCost === '3') {
      return (
        <tr>
          <th className='tdTitle'>배송비</th>
          <td className='tdContent' colSpan='2'>
            <input type="text" name="deliveryPriceSelect31" className='ptext price cost2' value={this.state.deliveryPriceSelect31} onChange={this.productChange}/>원 미만일 때 배송비 <input type="text" name="deliveryPriceSelect32" className='ptext price cost2' value={this.state.deliveryPriceSelect32} onChange={this.productChange}/>원을 부과합니다.
          </td>
        </tr>
      )
    }
  }

  render() {
    console.log(this.state.deliveryWay)
    return (
      <>
        <div className='admin-shopContents'>
          <div className={this.state.showInfo ? 'productInfo hideBackground' : 'productInfo showBackground'}>
            <p className={this.state.showInfo ? 'productInfo-infoText hideInfoText' : 'productInfo-infoText showInfoText'}>기본 정보</p>
            <div onClick={this.onShowInfoChange} className={this.state.showInfo ? 'productInfo-btn infoHide-btn' : 'productInfo-btn infoShow-btn'}></div>
          </div>
          <div className={this.state.showInfo ? 'admim-contents productInfo-hideInfo' : 'admim-contents productInfo-showInfo'}>
            <table className='product-table'>
              <colgroup>
                <col></col>
                <col></col>
                <col></col>
              </colgroup>
              <tbody>
                <tr>
                  <th className='tdTitle'>상품명<span>(필수)</span></th>
                  <td className='tdContent' colSpan='2'>
                    <input type="text" name='product_name' className='ptext name' value={this.state.product_name} onChange={this.productChange} maxLength='100'/><span className='productLength'>[<strong>{this.state.product_name.length}</strong>/100]</span>
                  </td>
                </tr>
                <tr>
                  <th className='tdTitle'>판매가<span>(필수)</span></th>
                  <td className='tdContent' colSpan='2'>
                    <input type="text" name="product_price" className='ptext price' value={this.state.product_price} onChange={this.productChange}/> 원
                    </td>
                </tr>
                <tr>
                  <th className='tdTitle'>상품 요약설명</th>
                  <td className='tdContent' colSpan='2'>
                    <input type="text" name="summary_desc" className='ptext desc' value={this.state.summary_desc} onChange={this.productChange} maxLength='200'/><span className='productLength'>[<strong>{this.state.summary_desc.length}</strong>/200]</span>
                  </td>
                </tr>
                <tr>
                  <th className='tdTitle'>상품 상세설명</th>
                  <td className='tdContent' colSpan='2'>
                  <ReactQuill 
                    theme='snow'
                    onChange={this.onEditorStateChange}
                    value={this.state.product_description}
                    modules={this.state.modules}
                    formats={this.state.formats}
                  />
                  </td>
                </tr>
                <tr>
                  <th className='tdTitle'>이미지</th>
                  <td className='tdContent-1 tdContent'>
                    <span className='txttitle'>대표이미지</span>
                    {this.state.mainFileName === '' ?
                    <>
                      <div className='product_mImage'>
                        <input className='btn-mImage' accept='image/,.jpg, .png, .gif' type='file' value={this.state.mainFileName} file={this.state.mainFile} onChange={this.mainHandleFileChange}/>
                      </div>
                      <span className='txtsize'>- 권장사이즈 : 500px*500px</span> 
                    </>
                    :
                    <>
                      <div onMouseOver={this.mainOnMouseOver} onMouseOut={this.mainOnMouseOut} className='product_mImage-on'>
                        <img className='mImg' src={this.state.mainImgSrc} alt='대표 이미지'/>
                        <div className={this.state.mainMouse ? 'mImage-btn-wrap imgHoverOn' : 'mImage-btn-wrap'}>
                          <input className='btn-mImage-change' type='file' onChange={this.mainHandleFileChange}/>
                          <div className='btn-mImage-delete' onClick={this.mainHandleImgDelete}></div>
                        </div>
                      </div>
                      <span className='txtsize'>- 권장사이즈 : 500px*500px</span> 
                    </>
                    }
                  </td>
                  <td className='tdContent-2 tdContent'>
                    <span className='txttitle'>추가이미지[<span>{this.state.addImgSrcArr.length}</span>/20]</span>
                    <div className='product_addImage'>
                      <ul>
                        {this.addImgRender()}
                        {this.addImgBtnRender()}
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={this.state.showState ? 'productInfo hideBackground' : 'productInfo showBackground'}>
            <p className={this.state.showState ? 'productInfo-infoText hideInfoText' : 'productInfo-infoText showInfoText'}>상품 상태</p>
            <div onClick={this.onShowStateChange} className={this.state.showState ? 'productInfo-btn infoHide-btn' : 'productInfo-btn infoShow-btn'}></div>
          </div>
          <div className={this.state.showState ? 'admim-contents productInfo-hideInfo' : 'admim-contents productInfo-showInfo'}>
            <table className='product-table'>
              <colgroup>
                <col></col>
                <col></col>
                <col></col>
              </colgroup>
              <tbody>
                <tr>
                  <th className='tdTitle'>진열상태</th>
                  <td className='tdContent' colSpan='2'>
                    <label className="container">진열함
                      <input type="radio" name="exhibition" onChange={this.onExhibitionStateChange}/>
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">진열안함
                      <input type="radio" defaultChecked name="exhibition" onChange={this.onExhibitionStateChange}/>
                      <span className="checkmark"></span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <th className='tdTitle'>판매상태</th>
                  <td className='tdContent' colSpan='2'>
                    <label className="container">판매함
                      <input type="radio" name="sale" onChange={this.onSaleStateChange}/>
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">판매안함
                      <input type="radio" defaultChecked name="sale" onChange={this.onSaleStateChange}/>
                      <span className="checkmark"></span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <th className='tdTitle'>공급가</th>
                  <td className='tdContent' colSpan='2'>
                    <input type="text" name="supply_price" className='ptext price' value={this.state.supply_price} onChange={this.productChange}/> 원
                  </td>
                </tr>
                <tr>
                  <th className='tdTitle'>소비자가</th>
                  <td className='tdContent' colSpan='2'>
                    <input type="text" name="user_price" className='ptext price' value={this.state.user_price} onChange={this.productChange}/> 원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={this.state.showDelivery ? 'productInfo hideBackground' : 'productInfo showBackground'}>
            <p className={this.state.showDelivery ? 'productInfo-infoText hideInfoText' : 'productInfo-infoText showInfoText'}>배송 정보</p>
            <div onClick={this.onDeliveryStateChange} className={this.state.showDelivery ? 'productInfo-btn infoHide-btn' : 'productInfo-btn infoShow-btn'}></div>
          </div>
          <div className={this.state.showDelivery ? 'admim-contents productInfo-hideInfo' : 'admim-contents productInfo-showInfo'}>
            <table className='product-table'>
              <colgroup>
                <col></col>
                <col></col>
                <col></col>
              </colgroup>
              <tbody>
                <tr>
                  <th className='tdTitle'>배송방법</th>
                  <td className='tdContent' colSpan='2'>
                    <select className='deliverySelect' onChange={this.onSelect1Change}>
                      <option value='1'>택배</option>
                      <option value='2'>빠른등기</option>
                      <option value='3'>일반등기</option>
                      <option value='4'>직접배송</option>
                      <option value='5'>퀵배송</option>
                      <option value='6'>배송필요 없음</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th className='tdTitle'>배송비</th>
                  <td className='tdContent' colSpan='2'>
                    <select className='deliverySelect' onChange={this.onSelect2Change}>
                      <option value='1'>배송비 무료</option>
                      <option value='2'>고정배송비 사용</option>
                      <option value='3'>구매 금액에 따른 부과</option>
                    </select>
                  </td>
                </tr>
                {this.select2Render()}
              </tbody>
            </table>
          </div>
        </div>
        <div className='admin-shopBtnWrap'>
          <div className='shopBtn'>
            <button onClick={this.handleFormCheck}>상품등록</button>
          </div>
        </div>
      </>
    )
  }
}

export default ShopWrite;
