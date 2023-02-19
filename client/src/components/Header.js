import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { tokenUpdate } from "../components/authSlice";

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const logOut = () => {
        localStorage.removeItem('token')
        dispatch(tokenUpdate(false))
        navigate('/login')
        console.log('log out')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#">
                    <img src="https://www.mangoitsolutions.com/wp-content/uploads/2022/01/becomeamernstackdeveloper-mobile-300x279.png" alt="" width="50" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create-update">Create Post</NavLink>
                        </li>
                    </ul>
                    <NavLink className="nav-link" to="#" onClick={(e) =>{ e.preventDefault(); logOut()}}>
                        <i className="fa fa-sign-out text-white" aria-hidden="true" style={{fontSize: 22}}></i>
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}
