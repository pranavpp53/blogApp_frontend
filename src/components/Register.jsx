import React, { useState } from 'react';
import './register.css';
import { postRegistrationData } from '../service/allapi';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigae=useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await postRegistrationData(formData);
            if(response.status<=200){
                console.log(response);
                alert(`${response.data.username} your account created successfully `)
                navigae('/')
            }
            else{
                console.log(`else${response}`);
            }
        } catch (error) {
            console.error('API error:', error);
        }
    };

    return (
        <div>
            <div className="register">
                <div className='w-25'>
                    <div className="registerTitle text-center">Register</div>
                    <form className="registerForm" onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input
                            type="text"
                            className="registerInput"
                            placeholder="Enter your username..."
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <label>Email</label>
                        <input
                            type="text"
                            className="registerInput"
                            placeholder="Enter your email..."
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            className="registerInput"
                            placeholder="Enter your password..."
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button className="registerButton" type="submit">
                            Register
                        </button>
                    </form>
                    
                </div>
            </div>
        </div>
    );
}

export default Register;
