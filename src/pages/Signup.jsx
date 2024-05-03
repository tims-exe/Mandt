import React, { useState } from 'react'
import './home.css'
import { supabase } from '../client';

const Signup = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    function handleChange(e) {
        setUser((prev)=> {
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    async function handleClick (e) {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signUp({
                email: user.email,
                password: user.password,
                options: {
                    data: {
                        username: user.username
                    }
                }
            })
            alert("Check your email for verification")
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='login-container'>
                <input type="text" placeholder='username' className='login-input' onChange={handleChange} name='username'/>
                <input type="text" placeholder='email' className='login-input' onChange={handleChange} name='email'/>
                <input type="password" placeholder='password' className='login-input' onChange={handleChange} name='password'/>
                <button className='login-button' onClick={handleClick}>
                    Sign Up
                </button>
            </div>
        </div>
    )
}

export default Signup