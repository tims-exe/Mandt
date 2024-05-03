import React, { useEffect, useState } from 'react'
import { supabase } from '../client'
import back from '../assets/backarrow.png'
import CartItems from '../components/cartItem'
import { Link } from 'react-router-dom'
import TotalBill from '../components/total'
import { pipe } from 'framer-motion'

const Cart = (props) => {

  const [cart, setCart] = useState([])
  const [mrp, setMRP] = useState(0)  
  const [calcPrice, setCalcPrice] = useState(true)
  const [sendReq, setSendReq] = useState(false)

  useEffect(() => {
    fetchCartItems()
    if (calcPrice) {
        cart.map((items) => {
            setMRP(prev => (prev + (items.product.price * items.quantity)))
            setCalcPrice(false)
        }) 
    }
  }, [cart, calcPrice])

  async function fetchCartItems() {
    const {data} = await supabase
        .from('cart')
        .select(`
            order_id,
            quantity,
            product:product_id( id, name, price, img )
        `)
        .order('order_id', { ascending: true });
    setCart(data)
  }

  const deleteButtonClick = async (id) => {
    const { data, error } = await supabase
        .from('cart')
        .delete()
        .eq('order_id', id)
    cart.map((items) => {
        if (items.order_id == id) {
            setMRP(-1*(items.product.price*items.quantity))
        }
    })
    setCalcPrice(true)
  }
  const updateDB = async (id, qnty, i) => {
    const { data, error } = await supabase
        .from('cart')
        .update({quantity: qnty})
        .eq('order_id', id);
    cart.map((items) => {
        if (items.order_id == id) {
            setMRP(items.product.price*i)
        }
    })
    setCalcPrice(true)
    //window.location.reload()
  }          

  return (
    <>
        <div className='flex flex-row justify-between px-7 mt-6'>
            <button>
                <Link to={'/home'}>
                    <img src={back} alt="" className='w-12 h-12'/>
                </Link>
            </button>
            <p className='cart-title'>
                CART
            </p>
            <p className='text-transparent'>
                .............
            </p>
        </div>
        <div className='bill'>
            <div className='item-box'>
                {
                    Object.keys(cart).length === 0 ? 
                        <p className='item-empty'>Your cart is empty</p> : 
                        cart.map((cartItem) => (
                            <CartItems id={cartItem.order_id} prd_id={cartItem.product.id} img={cartItem.product.img} name={cartItem.product.name} price={cartItem.product.price} deleteButtonClick={deleteButtonClick} quantity={cartItem.quantity} update={updateDB}/>
                        )) 
                }
            </div>
            <div className='item-bill'>
                <TotalBill mrp={mrp}/>
            </div>
        </div>
    </>
  )
}

export default Cart