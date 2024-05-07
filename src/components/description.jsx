import React from 'react'
import cartimg from '../assets/Cart.png'

const Desc = (props) => {
  return (
      <div className='desc-container'>
        <div className='desc-img-container'>
          <img src={props.img} alt="" className='desc-img'/>
          <p className='desc-ml'>{props.ml} mL</p>
        </div>
        <div className="desc-content">
          <div className="desc-title">
            <p>{props.name}</p>
          </div>
          <p className='desc-desc'>{props.desc}</p>
          <p className='desc-price'>PRICE: ₹{props.price}</p>
          <button className='desc-button' onClick={() => props.cartButtonClick(props.id, props.name, props.price, props.img)}>
            <p>ADD TO CART</p>
            <img src={cartimg} alt="" className='desc-cart'/>
          </button>
        </div>
      </div>
  );
}

export default Desc