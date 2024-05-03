import React from 'react'
import './items.css'

const GrandTotal = (props) => {
  return (
    <div className='grand-container'>
        <p>
            GRAND TOTAL  <br/> ₹{props.total}
        </p>
        <button className='grand-button'>
            PLACE ORDER
        </button>
    </div>
  )
}

export default GrandTotal