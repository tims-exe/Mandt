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
/* import axios from 'axios' */
import { useToast } from '@chakra-ui/react'

const Home = () => {

  const [pf_women, setPF_women] = useState([])
  const [pf_men, setPF_men] = useState([])
  const [pf_unisex, setPF_unisex] = useState([])

  useEffect(() => {
    fetchProductsM()
    fetchProductsW()
    fetchProductsU()
  }, [])


  async function fetchProductsM() {
    const {data} = await supabase
        .from('products')
        .select('*')
        .eq('category', 'women')
        setPF_men(data)
  }
  async function fetchProductsW() {
    const {data} = await supabase
        .from('products')
        .select('*')
        .eq('category', 'women')
        setPF_women(data)
  }
  async function fetchProductsU() {
    const {data} = await supabase
        .from('products')
        .select('*')
        .eq('category', 'women')
        setPF_unisex(data)
  }

  const logoutButton = () => {}
  const cartButtonClick = () => {}

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
                <Products id={perfume_women.id} name={perfume_women.name} price={perfume_women.price} pic={`images/${perfume_women.img}`} cartButtonClick={cartButtonClick}/>
            ))}
        </div>
        <HimTile/>
        <div className='flex flex-wrap justify-center'>
            {pf_men.map((perfume_men)=>(
                <Products id={perfume_men.id} name={perfume_men.name} price={perfume_men.price} pic={`images/${perfume_men.img}`} cartButtonClick={cartButtonClick}/>
            ))}
        </div>
        <ThemTile/>
        <div className='flex flex-wrap justify-center'>
            {pf_unisex.map((perfume_unisex)=>(
                <Products id={perfume_unisex.id} name={perfume_unisex.name} price={perfume_unisex.price} pic={`images/${perfume_unisex.img}`} cartButtonClick={cartButtonClick}/>
            ))}
        </div>
    </>
  )
}

export default Home