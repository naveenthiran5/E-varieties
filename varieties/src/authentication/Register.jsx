import React from 'react'
import Menubar from '../Menubar.jsx'
import Footer from '../Footer.jsx'

function Register() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      repassword: e.target.repassword.value
    };

    const res = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message);
  };
  return (
    <>
      <div>
        <Menubar />
      </div>
      <div className='register'>
        <form action="" onSubmit={handleSubmit}>
          <h3>Create Account</h3>
          <input type="text" name='name' id='name' placeholder='Name' required /><br />
          <input type="mail" name='email' id='email' placeholder='Email' required /><br />
          <input type="password" name="password" id="password" placeholder='Password' required /><br />
          <input type="password" name="repassword" id="repassword" placeholder='Re-Password' required /><br />
          <button type='submit' className='button btn btn-dark'><a href={'/login'}>Go to login</a></button>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default Register