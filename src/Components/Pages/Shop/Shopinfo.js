import React, {Component} from 'react';
import axios from 'axios';
import { numberWithCommas } from '../../../Util/Util';

class Shopinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopInfoData : [],
            productCnt : 1
        }
    }
    componentDidMount() {
        this.shopInfoCallApi();
    }
    
    shopInfoCallApi = () => {
        var params = {
            id:this.props.match.params.id
        }
        axios.post('http://192.168.0.17:5000/api/shopInfo', params).then((response) => {
            // SUCCEED
            console.log(response.data)
            var deliveryCost = response.data.deliveryCost;
            var deliveryPrice = response.data.deliveryPrice;
            var deliveryPriceSplit = [];
            
            if (deliveryCost === '1') {
                response.data.deliveryCostText = '무료';
            } else if (deliveryCost === '2') {
                response.data.deliveryCostText = `${numberWithCommas(parseInt(deliveryPrice))}원`;
            } else if (deliveryCost === '3') {
                deliveryPriceSplit = deliveryPrice.split(',');
                response.data.deliveryCostText = `${numberWithCommas(parseInt(deliveryPriceSplit[1]))}원 (${numberWithCommas(parseInt(deliveryPriceSplit[0]))}원 이상 구매 시 무료)`;
            }
            this.setState({
                shopInfoData : response.data,
            })
        }).catch((error) => {
            // FAILED
        });
    }
    productCntPlusEvent = () => {
        this.setState({
            productCnt : this.state.productCnt + 1,
            prodcutPrice : this.state.prodcutPrice * (this.state.productCnt + 1)
        })
    }
    productCntMinusEvent = () => {
        if(this.state.productCnt > 1) {
            this.setState({
                productCnt : this.state.productCnt - 1,
                prodcutPrice : this.state.prodcutPrice * (this.state.productCnt - 1)
            })
        }
    }
    shopInfoRender = () => {
        console.log(this.state.shopInfoData)
        const shopInfoData = this.state.shopInfoData;
        return (
            <>
                <div className="infoimg">
                    <img src={window.location.origin + '/Upload/' + shopInfoData.miFileName} alt='대표이미지'/>
                </div>
                <div className="infoText">
                   <p className="product_title">{shopInfoData.product_name}</p>
                   <table>
                       <tbody>
                            <tr>
                                <td>소비자가</td>
                                <td className="user_price">{numberWithCommas(parseInt(shopInfoData.user_price))} 원</td>
                            </tr>
                            <tr>
                                <td>판매가</td>
                                <td className="product_price">{numberWithCommas(parseInt(shopInfoData.product_price))} 원</td>
                            </tr>
                            <tr>
                                <td>국내·해외배송</td>
                                <td>국내배송</td>
                            </tr>
                            <tr>
                                <td>배송방법</td>
                                <td className="delivery_price">{shopInfoData.deliveryCostText}</td>
                            </tr>
                       </tbody>
                   </table>
                </div>
                <div className="product_set_wrap">
                    <div className="product_set">
                        <p>{shopInfoData.product_name}</p>
                        <p>{this.state.productCnt}</p>
                        <div className="btn_plus" onClick={this.productCntPlusEvent}>
                            <span></span>
                        </div>
                        <div className="btn_minus" onClick={this.productCntMinusEvent}>
                            <span></span>
                        </div>
                        <p>{numberWithCommas(this.state.productCnt * parseInt(shopInfoData.product_price))}</p>
                    </div>
                </div>
            </>
        )
    }

    render() {
        return (
            <>
                <div className='main-contents'>
                    <div className='shoh-wrap'>
                        <div className='shopinfo'>
                            <div className="mainFrame">
                                {this.shopInfoRender()}
                            </div>
                            {/* <h3>{this.props.match.params.id}</h3> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Shopinfo;