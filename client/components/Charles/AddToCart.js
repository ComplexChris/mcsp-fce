import React from 'react';
import CurrentCart from './CurrentCart.js';
import "./styles/styles.css";

let previousCart = null;

 class AddToCart extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            currentCart:false,
            cartItems: [],
            cartAmt: 0
        }

        this.clickEvent = this.clickEvent.bind(this);
        
    }

    

    sendRequest () {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({itemId: this.props.current_item_obj.id, userId: this.props.user_id})
            }   

        fetch("/api/cart/", requestOptions)
              .then((response) => response.json())
              .then((data) => {
              });
    }

    componentDidMount () {

        fetch(`/api/cart/${this.props.user_id}`)
              .then((response) => response.json())
              .then((data) => {
                  console.log(`get data by id:${this.props.user_id}`, data);

             return Promise.all(
                  data.map((cartItem)=>{
                    return fetch(`/api/items/${cartItem.itemid}`)
                        .then((response) => response.json())
                        .then((data)=> data[0])
                    })
              )

        }).then((itemInfo)=> this.setState({cartItems: itemInfo}));
    }

    

    clickEvent () {

        this.setState({currentCart:!this.state.currentCart}); // toggles modal

        if(this.state.currentCart === false) {
            this.setState((state)=>{
                return (
                    {cartItems:state.cartItems.push(this.props.current_item_obj)},
                    console.log('current items in cart: ',this.state.cartItems)
                )
            })

            this.sendRequest();
        }
        
        
      }

    render () {
        console.log('check it out:' , this.state.cartItems)
        return (
            
            <div className={"cartContainer"}>
                {this.state.currentCart && <CurrentCart 
                currentCart={this.clickEvent}
                cartItems={this.state.cartItems}
                sizeOfCart={Object.values(this.state.cartItems).length}
                />}

                <div className={'ecommerceCard'}>
                    <button className={'buyItNowBtn'}>Buy It Now</button>
                    <button className={'addToCartBtn'} onClick={this.clickEvent}>Add to cart</button>
                    <button className={'addToWatchlistBtn'}>Add to Watchlist</button>
                    <div className={'heartImg'}> <img src='heart.svg' height='12px' width='12px'></img></div> 
                </div>
            </div>
        );
    }
 }

 export default AddToCart;