import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const history = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        history('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">myNotebook</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeclassname="active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeclassname="active" to="/about">About</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex mx-3">
                            {!localStorage.getItem('token') ? <div><Link to="/login" className="btn btn-dark mx-1" >LogIn</Link>
                                <Link to="/signup" className="btn btn-dark mx-1" >SignUp</Link></div> 
                                :<ul className="navbar-nav "><li className="nav-item dropdown">
                                <a className="nav-link text-light dropdown-toggle" href="!#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {localStorage.getItem('userName')}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink className="dropdown-item" activeclassname="active" to="/profile">Profile</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </li></ul>}
                            {/* <div className="text-light nav-link">{localStorage.getItem('userName')}</div>
                            {!localStorage.getItem('token') ? <div><Link to="/login" className="btn btn-dark mx-1" >LogIn</Link>
                                <Link to="/signup" className="btn btn-dark mx-1" >SignUp</Link></div> : <button onClick={handleLogout} className="btn btn-dark">Logout</button>} */}
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
