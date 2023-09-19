import './Signup.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DateSelector from './date';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [emailError, SetEmailError] = useState("");
  const history = useHistory();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8000/profile/register", data)
      .then((res) => {
        console.log(res.data);
        history.push('/login');
      })
      .catch((err) => {
        console.error(err);
        SetEmailError(err.response.data.message)
      });
  };

  const handleDateSelect = (year, month, day) => {
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedDate = `${year}-${month}-${formattedDay}`;
    setValue("birthDate", formattedDate);
  };

  return (
    <div className='signup-container'>
      <img id="bird" src={require(`./Png/bluebird.png`)} alt="" />
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            {...register("firstName", {
              required: "First name must not be empty!",
              minLength: {
                value: 3,
                message: "First name must be at least 3 characters",
              },
            })}
          />
          {errors.firstName && <p className=" text-red-700 p-0 mb-4 ">{errors.firstName.message}</p>}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            {...register("lastName", {
              required: "Last name must not be empty!",
              minLength: {
                value: 3,
                message: "Last name must be at least 3 characters",
              },
            })}
          />
          {errors.lastName && <p className=" text-red-700 p-0 mb-4 ">{errors.lastName.message}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Phone number, email address"
            {...register("email", {
              required: "Email must not be empty!",
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
              required: "Password must not be empty!",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            })}
          />
          {errors.password && <p className=" text-red-700 p-0 mb-4 ">{errors.password.message}</p>}
        </div>
        <DateSelector onSelectDate={handleDateSelect} />
        <div>
          {emailError && <p className=" text-red-700 p-0 mt-4 ">{emailError}</p>}
          <button id='signup' type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
