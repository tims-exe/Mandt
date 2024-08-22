import  React, { useEffect, useRef, useState } from 'react'
import './fonts.css'
import menImg from '../assets/men.png'
import unisexImg from '../assets/unisex.png'
import womenImg from '../assets/women.png'
import line from '../assets/line.png'
import ourStory from '../assets/ourStory.png'
import { motion, useInView, useAnimation } from "framer-motion"
import { Link } from 'react-router-dom'
import { supabase } from '../client'


const LandingPage = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();
    const [cart, setCart] = useState([]);

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
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    async function updateCart(cart) {
        try {
            const deletionPromises = cart.map(async (item) => {
                return supabase
                  .from('cart')
                  .delete()
                  .eq('order_id', item.order_id)
              });
            
              await Promise.all(deletionPromises);
              console.log("All cart items deleted successfully!");
        } catch (error) {
            console.log(error)     
        }
      }
    
    return (
        <div> 
            <div className='intro-container'
            >
                <p className='logo'>
                    MANDT
                </p>
                <p className="intro">
                    Much More Than Perfume
                </p>
                <button className='shop-button' onClick={() => updateCart(cart)}>
                    <Link to={'/home'}>
                        SHOP NOW
                    </Link>              
                </button>
            </div>
            <div>
                <p className='mandt-caption'>
                Indulge in the sensory experience of MANDT, a fragrance that captivates hearts and let your fragrance do the talking
                </p>
            </div>
            <motion.div className='categories' ref = {ref}
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial= "hidden"
                animate= {mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                <div className='category-men'>
                    <img src={menImg} alt='' className='men-img'/>
                    <p className='men-name'>
                        MEN 
                    </p>
                    <img src={line} alt="" className='men-line' />
                </div>
                <div className='category-men'>
                    <img src={unisexImg} alt='' className='men-img'/>
                    <p className='men-name'>
                        UNISEX
                    </p>
                    <img src={line} alt="" className='men-line' />
                </div>
                <div className='category-men'>
                    <img src={womenImg} alt='' className='men-img'/>
                    <p className='men-name'>
                        WOMEN
                    </p>
                    <img src={line} alt="" className='men-line' />
                </div>
            </motion.div>
            <div className='our-story'>
                <div className='story-content'>
                    <h1 className='story-title'>
                        OUR STORY
                    </h1>
                    <p className='story-desc'>
                        We started as a small perfume tester center in India. Our main idea was to create fragrances that symbolizes art form of luxury. Our passion for exquisite scents is what drove us to curate the finest perfumes from around the world, offering a sensory journey that captivates the soul. Explore our collection and experience the essence of elegance, sophistication and allure
                    </p>
                </div>
                <img src={ourStory} alt="" className='story-img'/>
                
            </div>
        </div>    
      )
    }

export default LandingPage