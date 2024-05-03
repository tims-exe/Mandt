import React, { useState } from 'react'
import './home.css'
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate()
    const [user, setUser] = useState({
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
            const { data, error } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: user.password,
              })
            if (error) throw error
            console.log(data)
            props.setToken(data)
            /* navigate('/home') */
            navigate('/cart')
        } catch (error) {
            alert(error)
        }
    }


    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='login-container'>
                <input type="text" placeholder='email' className='login-input' onChange={handleChange} name='email'/>
                <input type="password" placeholder='password' className='login-input' onChange={handleChange} name='password'/>
                <button className='login-button' onClick={handleClick}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login