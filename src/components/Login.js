
import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>WELCOME BACK</h2>
        <p>Welcome back! Please enter your details.</p>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className="options">
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="/">Forgot password</a>
          </div>
          <button type="submit" className="sign-in">Sign in</button>
          <button type="button" className="sign-in-google">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" />
            Sign in with Google
          </button>
        </form>
        <p className="sign-up">Don't have an account? <a href="/">Sign up for free!</a></p>
      </div>
      <div className="login-image">
        {/* You can replace this with the actual image */}
        <img src="path_to_your_image" alt="Login illustration" />
      </div>
    </div>
  );
}

export default Login;
