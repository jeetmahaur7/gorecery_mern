import React from 'react'
import { Link } from 'react-router-dom'

import Hero from './Partials/Hero'

export default function Confirmation() {
    return (
        <>
            <Hero title="Order is Placed" />
            <div className="container my-3 text-center">
                <h3>Thank You!!!</h3>
                <h4>Order Order Has Been Placed</h4>
                <h5>Now You Can Track Your Order and Shipping Details in Profile Section</h5>
                <Link to="/shop" className='btn btn-primary'>Shop More</Link>
            </div>
        </>
    )
}
