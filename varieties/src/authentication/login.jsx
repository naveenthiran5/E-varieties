import React from 'react'
import { useNavigate } from 'react-router-dom'
import Menubar from '../Menubar.jsx'
import Footer from '../Footer.jsx'

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", data.name);
        localStorage.setItem("email", data.email);
        navigate('/');
      } else {
        alert(data.detail || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during login.");
    }
  };

  return (
    <div>
      <div>
        <Menubar />
      </div>
      <div className='login'>
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <input type="mail" name='email' id='email' placeholder='Email' required /><br />
          <input type="password" name="password" id="password" placeholder='Password' required /><br />
          <a href="#" className='forget'>Forget password</a>
          <button type='submit' className='btn btn-dark'>Login</button>
        </form>
        <a href={'/register'} className='create'>Create account</a>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Login