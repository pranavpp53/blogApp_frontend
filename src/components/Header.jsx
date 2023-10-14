import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'

function Header() {
  const [user, dispatch] = useState(false);
  const [username, setusername] = useState('');
  const [isNavVisible, setIsNavVisible] = useState(false);

  const handleToggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    alert('Logout successful');
    window.location.reload();
  };

  useEffect(() => {
    const data = localStorage.getItem("userId");
    if (data && !user) {
      dispatch(true);
    }
    setusername(localStorage.getItem("userName"));
  }, [user]);

  return (
    <div>
      <div className="nav-area">
        <input type="checkbox" id="box" />
        <label htmlFor="box" className="btn-area" onClick={isNavVisible ? handleToggleNav : () => setIsNavVisible(true)}>
          <i className={`fa ${isNavVisible ? 'fa-times' : 'fa-bars'}`}></i>
        </label>
        <label className="logo h-100">
        </label>
        <ul className={isNavVisible ? 'nav-visible' : 'nav-hidden'}>
          <li>
            <Link to={"/"} onClick={handleToggleNav}>Home</Link>
          </li>
          {user && (
            <li>
              <Link to={"/write"} onClick={handleToggleNav}>Write</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to={"/myposts"} onClick={handleToggleNav}>My Posts</Link>
            </li>
          )}
          {user ? (
            <li className='signin-sep-div' onClick={handleLogout}>
              <a href="/" onClick={handleToggleNav}>Logout</a>
            </li>
          ) : (
            <>
              <li className='signin-sep-div'>
                <Link to={"/login"} onClick={handleToggleNav}>Login</Link>
              </li>
              <li>
                <Link to={"/register"} onClick={handleToggleNav}>Sign up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>

  )
}

export default Header