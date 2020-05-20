import React, { Component } from 'react'
import OrderItem from './../OrderItem'
import './style.css'

const testdata = [ //停止使用，使用mock api 替换
    {
        id         : 1,
        shop       : "商店店名1",
        picture    : "https://img1.mukewang.com/585487a5000130ed04190419-140-140.jpg",
        product    : "商品名称1",
        price      : "10",
        ifCommented: false
    },
    {
        id         : 2,
        shop       : "商店店名2",
        picture    : "https://img1.mukewang.com/585487a5000130ed04190419-140-140.jpg",
        product    : "商品名称2",
        price      : "20",
        ifCommented: true
    },
    {
        id         : 3,
        shop       : "商店店名3",
        picture    : "https://img1.mukewang.com/585487a5000130ed04190419-140-140.jpg",
        product    : "商品名称3",
        price      : "30",
        ifCommented: true
    }
]
class OrderList extends Component {
    constructor(props){ //通过构造器 传值
        super(props);
        this.state = {orderList:[]};
    }
    componentDidMount (){
        // 会有跨域的问题，所以调试时还是要使用 ./mock/orders.json
		//https://jiangjiesheng.gitee.io/react-demo-orderlist/mock/orders.json
		alert("调试状态下使用本地资源");
        fetch('./mock/orders.json').then(res => { //Promise对象
            // console.log(res) 
            if(res.ok){ // 包装对象中的值,不是api中的字段
                res.json().then(orderList=>{ 
                    this.setState(
                        {
                            orderList 
                        }
                    );
                })
            }

        })
    }
    render () {
        return (
            <div className='orderList'>
                {
                    this.state.orderList.map(item => {  // testdata 
                        return <OrderItem key={item.id} data={item} onSubmitCallback={this.handleSubmitCallback}/> 
                    })
                }
                {/* <OrderItem data={data}/> 这是被注释到的 */}
            </div>
        )
    }
    handleSubmitCallback  = (id,comment,stars) => { //应该在接口请求完成后执行
      const newOrderList = this.state.orderList.map(item => {
            return item.id === id ? 
            {
                ...item,comment, stars, ifCommented: true  //es6语法，生成新对象
                        }      : item;
        });
     this.setState({
            orderList: newOrderList
         });
    }
}

export default OrderList
