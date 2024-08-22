import React, { useEffect, useState } from 'react'
import './items.css'
import deleteIcon from '../assets/delete.png'
/* import axios from 'axios' */
import { useLocation } from 'react-router-dom'
import { supabase } from '../client'
 
const CartItems = (props) => { 
  const [qnty, setQuantity] = useState(props.quantity)
  const [sendReq, setSendReq] = useState(false)

  useEffect(() => {
    /* const updateDB = async () => {
        if (sendReq){
            const { data, error } = await supabase
                .from('cart')
                .update({quantity: qnty})
                .eq('order_id', props.id)
            setSendReq(false)
            window.location.reload()
        }       
    }   
    updateDB() */
  })

  const q_increment = () => {
    if (qnty < 10){
        setSendReq(true)
        setQuantity(prev => (prev + 1))
        props.update(props.id, qnty+1, 1)
        //SetCartItem(prev => ({...prev, quantity: qnty+1}))
    }
  }

  const q_decrement = () => {
    if (qnty > 1){
        setSendReq(true)
        setQuantity(prev => (prev - 1))
        props.update(props.id, qnty-1, -1)
        //SetCartItem(prev => ({...prev, quantity: qnty-1}))
    }
  }
  
  return (
    <div className='cart-item'>
        <img src={`images/${props.img}`} alt="" className='item-img'/>
        <div className='item-tile'>
            <div className='flex flex-col'>
                <h1 className='item-title'>
                    {props.name}
                </h1>
                <p className='item-price'>
                    Price: ₹{props.price}
                </p>
            </div>
            <div className='item-footer'>
                <div className='item-quantity'>
                    <button onClick={q_decrement}>
                        -
                    </button>
                    <p>
                        {qnty}
                    </p>
                    <button onClick={q_increment}>
                        +
                    </button>
                </div>
                <button>
                    <img src={deleteIcon} alt="" className='item-delete' onClick={() => props.deleteButtonClick(props.id)}/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default CartItems



/*

*/