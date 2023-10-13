import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'

function Header() {
  const [user, dispatch] = useState(false)
  const navigate=useNavigate()
  const [username,setusername]=useState('')

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName")
    alert('logout successfull')
    navigate("")
    window.location.reload();
  };

  useEffect(() => {
    const data = localStorage.getItem("userId")
    if (data && !user) {
      dispatch(true)
      if (user) {
        window.location.reload();
      }
    }
    setusername(localStorage.getItem("userName"))
  }, [user]);
  return (
    <div className="top ">
      <div className="topCenter  ">
        <div className='w-75 header-first'>
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" style={{ textDecoration: 'none', color: 'black' }} to="/">
                HOME
              </Link>
            </li>
            {
              user && <li className="topListItem">
                <Link className="link" style={{ textDecoration: 'none', color: 'black' }} to="/write">
                  WRITE
                </Link>
              </li>
            }
            {
              user && <li className="topListItem">
                <Link className="link" style={{ textDecoration: 'none', color: 'black' }} to="/myposts">
                  MY POSTS
                </Link>
              </li>
            }
  
            {user && <li className="topListItem" onClick={handleLogout} >LOGOUT</li>}
          </ul>
        </div>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link d-flex" to="">
            <span className='topListItem'>{username}</span>
            <img
              className="topImg"
              src="https://i.postimg.cc/yNPKjvN9/8380015.jpg"
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" style={{ textDecoration: 'none', color: 'black' }} to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" style={{ textDecoration: 'none', color: 'black' }} to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Header