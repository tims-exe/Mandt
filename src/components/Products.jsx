import React, { useRef, useEffect } from 'react'
import './prdts.css'
import line_cart from '../assets/lineCart.png'
import cartimg from '../assets/Cart.png'
import { motion, useInView, useAnimation } from "framer-motion"
/* import axios from 'axios' */
/* import cartButtonClick from './cartButton' */

const Products = (props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
        mainControls.start("visible");
    }
}, [isInView, mainControls]);


  return (
    <motion.div className='product-card' ref={ref}
        variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
        }}
        initial= "hidden"
        animate= {mainControls}
        transition={{ duration: 0.4, delay: 0.25 }}
    >
        <img src={props.pic} alt="" className='product-img'/>
        <div className='product-box'key={props.id}>
            <div className="product-dets">
                <p className='product-name'>
                    {props.name}
                </p>
                <p className='product-price'>
                    {'₹'+props.price}
                </p>
            </div>
            <img src={line_cart} alt="" className='product-line'/>
            {/* delete props.price and props.pic..........later delete props.name when deleting console.log 
            props.cartButtonClick(props.id, props.name, props.price, props.pic)*/}
            <button className='product-cart' onClick={() => {props.cartButtonClick(props.id, props.name, props.price, props.pic)}}>
                <img src={cartimg} alt="" />
            </button>
        </div>
    </motion.div>
  )
}

export default Products


/*
<button className='product-add'>
            ADD TO BAG
        </button>
*/