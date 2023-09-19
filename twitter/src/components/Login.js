import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { login } = useUser();
  const [loginError, setLoginError] = useState("");
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const history = useHistory();

  const handleLogin = (loginData) => {
    axios
      .post("http://localhost:8000/profile/login", loginData)
      .then((res) => {
        console.log(res.data);
        const userToken = res.data.jwt;
        const user = res.data.user;
        login(user, userToken);
        history.push('/home');
      })
      .catch((err) => {
        console.error(err);
        setLoginError(err.response.data.message);
      });
  };

  return (
    <div className='login-container'>
      <img id="bird" src={require(`./Png/bluebird.png`)} alt="" />
      <h2>Log in to Twitter</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Phone number, email address"
            {...register("email", {
              required: "Email must not be empty!"
            })}
          />
          {errors.email && <p className=" text-red-700 p-0 mb-4 ">{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", {
              required: "Password must not be empty!"
            })}
          />
          {errors.password && <p className=" text-red-700 p-0 mb-4 ">{errors.password.message}</p>}
        </div>
        <div>
          {loginError && <p className=" text-red-700 p-0 mb-4 ">{loginError}</p>}
          <button id="login" type="submit">Log In</button>
        </div>
        <div className='other-section'>
          <a href="/">Forgot password?</a>
          <a href="/">Sign up to Twitter</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
