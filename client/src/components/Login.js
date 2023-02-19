import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { tokenUpdate } from "../components/authSlice";

export const Login = () => {
    const api = process.env.REACT_APP_API_KEY
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(null)

    // const token = localStorage.getItem('token')

    const submit = async (e) => {
        e.preventDefault();
        let data = {
            email: email,
            password: password
        }
        if (data) {
            const headers = {
                "Content-Type": "application/json"
            }
            const res = await axios.post(api + "auth/login", data, headers)

            if (res.data.status == 200) {
                localStorage.setItem('token', res.data.token)
                dispatch(tokenUpdate(true))
                navigate('/')
                return (alert('Login successful'))
            }
            else {
                return (alert('An error occurred'))
            }
        }
        else {
            return (alert('Please provide all the values'))
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-4 offset-md-4 border p-4 mt-4">
                        <form onSubmit={submit}>
                            <h4 className="mb-4 border p-2">Login</h4>
                            <div className="form-group text-left">
                                <label htmlFor="email">Email address</label>
                                <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" className="form-control" id="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
