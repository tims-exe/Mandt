import React, { useEffect, useState } from 'react'
import './items.css'
import GrandTotal from './grandbill'
import CoupCard from './couponcard'

const TotalBill = (props) => {
  
  const [dsc, setDsc] = useState(0)
  const discountApplied = (percent) => {
    setDsc(percent)
  }

  return (
    <div className='totalbill-container'>
        <div className='bill-container'>
            <h1>
                Price Details
            </h1>
            <div className='flex flex-row text-xl mt-10 justify-between mx-8'>
                <p>
                    MRP
                </p>
                <p>
                    ₹{props.mrp}
                </p>
            </div>
            <div className='flex flex-row text-xl mt-10 justify-between mx-8'>
                <p>
                    Coupon Applied
                </p>
                <p>
                    {dsc}%
                </p>
            </div>
            {/* <div className='flex flex-row text-2xl font-bold mt-10 justify-between mx-8'>
                <p>
                    Total
                </p>
                <p>
                    ₹{props.mrp - ((dsc/100)*props.mrp)}
                </p>
            </div> */}
        </div>
        <CoupCard discountApplied={discountApplied}/>
        <GrandTotal total={props.mrp - ((dsc/100)*props.mrp)} length={props.length}/>
    </div>
  )
}

export default TotalBill


/*

*/