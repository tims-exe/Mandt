import React, { useRef, useEffect, ref } from 'react'
import './prdts.css'
import line_cart from '../assets/lineCart.png'
import cartimg from '../assets/Cart.png'
import { motion, useInView, useAnimation } from "framer-motion"
/* import axios from 'axios' */
/* import cartButtonClick from './cartButton' */
import {
    Modal,
    ModalOverlay,
    ModalContent,
} from '@chakra-ui/react'
import { useDisclosure, Button } from '@chakra-ui/react'
import Desc from './description'

const Products = (props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
        mainControls.start("visible");
    }
}, [isInView, mainControls]);

const { isOpen, onOpen, onClose } = useDisclosure()
const btnRef = React.useRef(null)

const handleCart = (id, name, price, pic) => {
  onClose()
  props.cartButtonClick(id, name, price, pic)
}


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
        <button ref={btnRef} onClick={onOpen}>
            <img src={props.pic} alt="" className='product-img'/>
        </button>
        <div className='product-box'key={props.id}>
            <button className='product-container' onClick={onOpen}>
              <div className="product-dets">
                  <p className='product-name'>
                      {props.name}
                  </p>
                  <p className='product-price'>
                      {'₹'+props.price}
                  </p>
              </div>
              <img src={line_cart} alt="" className='product-line'/>
            </button>
            <button className='product-cart' onClick={() => props.cartButtonClick(props.id, props.name, props.price, props.pic)}>
                <img src={cartimg} alt="" />
            </button>
        </div>
        <div className='desc-modal'>
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
          size={'3xl'}
        >
          <ModalOverlay />
          <ModalContent>
            <Desc id={props.id} name={props.name} img={props.pic} desc={props.desc} ml={props.ml} price={props.price} cartButtonClick={handleCart}/>
          </ModalContent>
        </Modal>
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