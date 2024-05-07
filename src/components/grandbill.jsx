import React, { useState, useEffect } from 'react'
import './items.css'
import { useToast } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure, Button } from '@chakra-ui/react'
import { supabase } from '../client'
import { useNavigate } from 'react-router-dom'

const GrandTotal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await supabase
          .from('cart')
          .select('*')
          setCart(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCart();
  }, []);

  const placeorder = async () => {
    if (props.length != 0){
      try {
        const deletionPromises = cart.map(async (item) => {
            return supabase
              .from('cart')
              .delete()
              .eq('order_id', item.order_id)
          });
        
          await Promise.all(deletionPromises);
          console.log("All cart items deleted successfully!");
          navigate('/confirmed')
      } catch (error) {
          console.log(error)     
      }
    }
    else {
      toast({
        position: 'top',
        title: 'Empty Cart',
        variant: 'solid',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  return (
    <div className='grand-container'>
        <p>
            GRAND TOTAL  <br/> ₹{props.total}
        </p>
        <button className='grand-button' onClick={placeorder}>
            PLACE ORDER
        </button>
        {/* <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Order Confirmed</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Thank you for shopping
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
    </div>
  )
}

export default GrandTotal