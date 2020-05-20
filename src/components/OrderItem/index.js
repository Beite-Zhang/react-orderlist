import React, { Component } from 'react'
import './style.css';
class OrderItem extends Component {
    constructor(props){
        super(props);
        this.state={ 
            //首先要有属性，下面才能通过const {} 解析出属性
            editting: false,
            stars   : props.data.stars || 0,    //这里不是来自于api，而是从上一次提交评价后才读取出来的
            comment : props.data.comment || ""  //这里不是来自于api，而是从上一次提交评价后才读取出来的
        }
    }
  
    render () {
        const {shop,product,price,picture,ifCommented} = this.props.data;  //从属性值中解析出字段

        return (
            <div className='orderItem'>
                <div className='orderItem__containner'>
                    <div className='orderItem__picContainner'> 
                        <img alt='' className='orderItem__pic' src={picture} />
                    </div>
                    <div className='orderItem__content'>
                        <div className='orderItem__product'>{product}</div>
                        <div className='orderItem__shop'>{shop}</div>
                        <div className='orderItem__detail'>
                            <div className='orderItem__price'>￥{price} </div>
                            <div className='orderItem__btn '>
                            { // 判断
                                ifCommented ? ( 
                                <button className='orderItem__btn--gray' onClick={this.handleOpenOrCloseEditArea}>已评价</button>
                                ):(
                                <button className='orderItem__btn--red' onClick={this.handleOpenOrCloseEditArea}>未评价</button>
                                )
                            }
                            </div>
                        </div>
                    </div>
                </div>
                
                {this.state.editting?this.renderEditArea():null}
          
            </div>
        )
    }

    renderEditArea(){
        return (
            <div className='orderItem__commentContainer'>
                
                {/* textarea好像需要写成完成闭合的 */}
                <textarea onChange={this.handleCommentChange} value={this.state.comment}  maxLength='300' className='orderItem__comment' placeholder='请输入您的评价'></textarea> 
                <div className='orderItem__StarContainer'>
                {this.renderStars()}
                </div>
                <div >
                    <button className=' orderItem__btn--red'  onClick={this.handleSubmitComment}>提交</button>
                    <button className=' orderItem__btn--gray' onClick={this.handleCancelComment}>取消</button>
                </div>
            </div>
        );
    }

    renderStars(){
        const {stars} = this.state;
        return (
            <div>
            {[1,2,3,4,5].map((item,index)=>{ //map 作用在数组上
                const lightClass = stars >=item ?"orderItem__star--light":"";
                return (
                    <span key={index} className={"orderItem__star "+lightClass} onClick={this.handleClickStars.bind(this,item)}>★</span>
                ) // .bind(item) ,就不需要使用data-的方式取值了
            })}
                
            </div>
        );
    }

    handleOpenOrCloseEditArea = () => { //使用es6的箭头函数保证函数中的this执行当前组件的实例
        // 如果是已经评价，这里只能关闭不能打开评价区域
        if(this.props.data.ifCommented){
            return;
        }
        this.setState({
            editting: !this.state.editting
        })
    }

    handleCommentChange = (e) =>{
        this.setState({
            comment: e.target.value
        })
    }

    handleClickStars = (stars) => {
        //alert(JSON.stringify(stars))
        this.setState({
            stars  //即 stars:stars
        })
    }
    handleCancelComment = () => {
        this.setState({
            editting: false,
            comment : "",
            stars   : 0
        })
    }
    handleSubmitComment  = () => {
        const {id }            = this.props.data;
        const {comment,stars } = this.state;
        this.setState({
            editting: false
        })
        //提交服务器
        this.props.onSubmitCallback(id,comment,stars) // onSubmitCallback 在父组件中绑定在OrderItem组件上，应该在接口请求完成后执行
    }
}

export default OrderItem
