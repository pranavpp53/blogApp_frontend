import React, { useState } from 'react';
import './login.css';
import { loginUser } from '../service/allapi';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [responseMessage, setResponseMessage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(formData)

      if (response.status <= 210) {
        localStorage.setItem("userId", response.data.user._id)
        localStorage.setItem("userName", response.data.user.username)
        alert(response.data.message)
        navigate('/')
        window.location.reload();
      }
      else {
        alert(response.data.message)
      }
    } catch (error) {
      setResponseMessage('Error: An error occurred while making the API request');
    }
  };

  return (
    <div>
      <div className="login">
        <div className='w-25'>
          <div className="loginTitle text-center">Login</div>
          <form className="loginForm" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              className="loginInput"
              type="text"
              name="email"
              placeholder="Enter your email..."
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <label>Password</label>
            <input
              className="loginInput"
              type="password"
              name="password"
              placeholder="Enter your password..."
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            <button type="submit" className="loginButton">
              Login
            </button>
          </form>
        </div>
      </div>
      {responseMessage && <div className="responseMessage">{responseMessage}</div>}
    </div>
  );
}

export default Login;
