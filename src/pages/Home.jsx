import React, { useEffect, useState } from 'react'
import { supabase } from '../client'
import './home.css'
import Products from '../components/Products'
import prf from '../assets/profile_pic.png'
import bag from '../assets/home_bag.png'
import lineMain from '../assets/line_main.png'
import HerTile from '../components/hertile'
import HimTile from '../components/himtile'
import ThemTile from '../components/themtile'
import { Link } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const Home = () => {

  const [pf_women, setPF_women] = useState([])
  const [pf_men, setPF_men] = useState([])
  const [pf_unisex, setPF_unisex] = useState([])
  const [sendReq, setSendReq] = useState(false)
  const toast = useToast()

  const [item, setItem] = useState({
    id: null,
    quantity: 1,
  })

  useEffect(() => {
    fetchProductsM()
    fetchProductsW()
    fetchProductsU()

    const postItem = async () => {
        if (sendReq) {
           try {
                await supabase
                .from('cart')
                .insert({
                    product_id: item.id,
                    quantity: item.quantity
                })
           } catch (error) {
                console.log(error)
           }
           setSendReq(false)
        }
    }
    postItem()
  }, [sendReq, item])


  async function fetchProductsM() {
    try {
        const {data} = await supabase
            .from('products')
            .select('*')
            .eq('category', 'men')
            setPF_men(data)
    } catch (error) {
        console.log(error)
    }
  }
  async function fetchProductsW() {
    try {
        const {data} = await supabase
            .from('products')
            .select('*')
            .eq('category', 'women')
            setPF_women(data)
    } catch (error) {
        console.log(error)
    }
  }
  async function fetchProductsU() {
    try {
        const {data} = await supabase
            .from('products')
            .select('*')
            .eq('category', 'unisex')
            setPF_unisex(data)
    } catch (error) {
        console.log(error)
    }
  }

  const logoutButton = () => {}
  const cartButtonClick = (id, name, price) => {
    setItem({
        id: id,
        quantity: 1,
    })
    toast({
        title: `${name} added to Cart`,
        status: 'success',
        duration: 3000,
        isClosable: true,
    })
    setSendReq(true)
  }

  return (
    <>
        <div className='flex flex-col items-center'>
            <div className="home-header">
                <button onClick={logoutButton}>
                    <img src={prf} alt="" className='home-img' />
                </button>
                <button>
                    <Link to={'/'}>
                        <p className='home-logo'>
                            MANDT
                        </p>
                    </Link>
                </button>
                <button> 
                    <Link to={'/cart'}>
                        <img src={bag} alt="" className='home-img'/>
                    </Link>
                </button>
            </div>
            <img src={lineMain} alt="" className='header-line'/>
            <p className='home-desc'>
                FRAGRANCES
            </p>
        </div>
        <HerTile/>
        <div className='flex flex-wrap justify-center'>
            {pf_women.map((perfume_women)=>(
                    <Products id={perfume_women.id} name={perfume_women.name} price={perfume_women.price} pic={`images/${perfume_women.img}`} cartButtonClick={cartButtonClick} desc={perfume_women.description} ml={perfume_women.mL}/>
            ))}
        </div>
        <HimTile/>
        <div className='flex flex-wrap justify-center'>
            {pf_men.map((perfume_men)=>(
                <Products id={perfume_men.id} name={perfume_men.name} price={perfume_men.price} pic={`images/${perfume_men.img}`} cartButtonClick={cartButtonClick} desc={perfume_men.description} ml={perfume_men.mL}/>
            ))}
        </div>
        <ThemTile/>
        <div className='flex flex-wrap justify-center'>
            {pf_unisex.map((perfume_unisex)=>(
                <Products id={perfume_unisex.id} name={perfume_unisex.name} price={perfume_unisex.price} pic={`images/${perfume_unisex.img}`} cartButtonClick={cartButtonClick} desc={perfume_unisex.description} ml={perfume_unisex.mL}/>
            ))}
        </div>
    </>
  )
}

export default Home