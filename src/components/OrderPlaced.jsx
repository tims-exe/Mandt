import  React, { useEffect, useRef } from 'react'
import checkIcon from '../assets/check.png'
import continueButton from '../assets/continue.png'
import { Link } from 'react-router-dom'
import { motion, useInView, useAnimation } from "framer-motion"

const Confirmed = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
        mainControls.start("visible");
    }
  }, [isInView, mainControls]);
  return (
    <div className="confirmed-background">
      <motion.div className="confirmed-container" ref={ref}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial= "hidden"
        animate= {mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <img src={checkIcon} alt="" className='confirmed-icon'/>
        <h1 className='confirmed-text'>Order confirmed<br></br>Thank you!</h1>
        <button>
          <Link to={'/home'} className='confirmed-back'>
            <div className='confirmed-continue'>Continue Shopping</div>
            <img src={continueButton} alt="" />
          </Link>
        </button>
      </motion.div>
    </div>
  )
}

export default Confirmed