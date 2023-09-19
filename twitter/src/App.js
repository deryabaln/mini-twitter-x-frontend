import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/Signup';
import StartPage from './components/StartPage';
import TweetDetail from './components/TweetDetail';
import PrivateRoute from './hooks/PrivateRoute';
import Profile from './components/Profile';
import './App.css';
import { useUser } from './hooks/UserContext';
import axios from 'axios';

const App = () => {
  const { user, logout, trendData } = useUser();
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState('');
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [userList, setUserList] = useState([]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowSearchIcon(e.target.value === '');
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserList(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [token, user]);

  const formatNumber = (number) => {
    if (number < 1000) {
      return number.toString();
    } else if (number < 1000000) {
      return (number / 1000).toFixed(0) + 'K';
    } else {
      return (number / 1000000).toFixed(1) + 'M';
    }
  };

  return (
    <div className="homePage">
      {token &&
        <div className="Navbar">
          <img id="bird" src={require(`./components/Png/bluebird.png`)}
            alt=''
            style={{ marginLeft: "25%", marginTop: "5%", marginBottom: " 10%" }} />
          <NavLink className="navLink" to="/home">
            <img src={require(`./components/Png/navhome.png`)} alt="" /> Home
          </NavLink>
          <NavLink className="navLink" to="/explore">
            <img src={require(`./components/Png/navhas.png`)} alt="" /> Explore
          </NavLink>
          <NavLink className="navLink" to="/notifications">
            <img src={require(`./components/Png/navnotif.png`)} alt="" /> Notifications
          </NavLink>
          <NavLink className="navLink" to="/messages">
            <img src={require(`./components/Png/navmess.png`)} alt="" /> Messages
          </NavLink>
          <NavLink className="navLink" to="/bookmarks">
            <img src={require(`./components/Png/navbook.png`)} alt="" /> Bookmarks
          </NavLink>
          <NavLink className="navLink" to="/lists">
            <img src={require(`./components/Png/navlists.png`)} alt="" /> Lists
          </NavLink>
          <NavLink className="navLink" to="/profile">
            <img src={require(`./components/Png/navpro.png`)} alt="" /> Profile
          </NavLink>
          <NavLink className="navLink" to="/more">
            <img src={require(`./components/Png/navmore.png`)} alt="" /> More
          </NavLink>
          <div className="profile">
            <img className="profile-pic" src={require(`./components/Png/Picture1.png`)} alt="" />
            <div className="flex flex-col w-8/12 text-sm  ">
              <span className="text-black font-bold">{user.firstName} {user.lastName}</span>
              <span className="text-slate-500">@{user.email.split("@")[0]}</span>
            </div>
            <div className="logout" style={{ width: "15%", margin: "0", }}>
              <button style={{ padding: "0", border: "none", width: "90%", }}>...</button>
              <div className="logout-content">
                <button onClick={() => logout()} style={{ color: "red", padding: "1%", border: "none", fontSize: "0.8rem", marginTop: "8%" }} id="button2">Logout</button>
              </div>
            </div>
          </div>
        </div>
      }
      <Switch>
        <Route path="/login">
          {token ? (<Redirect to="/home" />) : (<Login />)}
        </Route>
        <Route path="/signUp">
          {token ? (<Redirect to="/home" />) : (<SignUp />)}
        </Route>
        <Route exact path="/">
          {token ? (<Redirect to="/home" />) : (<StartPage />)}
        </Route>
        <PrivateRoute path="/home" ><Home /></PrivateRoute>
        <PrivateRoute path="/profile" >< Profile /></PrivateRoute>
        <PrivateRoute path="/tweet/:id" >< TweetDetail /></PrivateRoute>
      </Switch>
      {token &&
        <div className="search">
          <div className="search-input-container">
            <input
              type="text"
              name="search"
              value={search}
              onChange={handleSearchChange}
              className="search-input"
              placeholder="Search Twitter"
            />
            {showSearchIcon && (
              <div className="placeholder-image">
                <img src={require(`./components/Png/search.png`)} alt=""
                  style={{ width: "1.5%", position: "absolute", margin: "-2.4% 2.5%" }}
                />
              </div>
            )}
          </div>
          <div className="trends">
            <div className="flex flex-row justify-between" >
              <h3 className="font-bold ">Trends for you</h3>
              <img src={require(`./components/Png/setting.png`)} alt=""
                style={{ width: "12%", margin: "0", }} />
            </div>
            {trendData.map((trend) => (
              <div className='trend-card'>
                <p className="flex flex-row justify-between text-xs text-gray-600 " >Trending in  {trend.country} <span>...</span></p>
                <h3 className="font-bold text-xs ">{trend.header}</h3>
                <p className="text-xs text-gray-600 ">{formatNumber(trend.tweets)} Tweets</p>
              </div>
            ))}
            <a className="text-xs mt-2 "> Show more</a>
          </div>
          <div className="follow">
            <h3 className="font-bold ">You might like</h3>
            {userList.slice(0, 3).map((followUser) => {
              if (user.id !== followUser.id) {
                return (
                  <div key={followUser.id} className='follow-user'>
                    <img className="profile-pic" src={require(`./components/Png/Picture1.png`)} alt="" />
                    <div className="flex flex-col w-8/12 text-sm">
                      <span className="text-black font-bold">{followUser.firstName} {followUser.lastName}</span>
                      <span className="text-slate-500">@{followUser.email.split("@")[0]}</span>
                    </div>
                    <button
                      style={{ width: "25%", height: "25px", padding: "2%", fontSize: "0.7rem", color: "white", background: "black" }}>
                      Follow</button>
                  </div>
                );
              }
              return null;
            })}
            <a className="text-xs mt-5 "> Show more</a>
          </div>
          <div className="footer" >
            <a className='text-gray-600 mr-3 mt-2 '>Terms of Service</a>
            <a className='text-gray-600 mr-3 mt-2 '>Privacy Policy</a>
            <a className='text-gray-600 mr-3 mt-2 '>Cookie Policy</a>
            <a className='text-gray-600 mr-3 mt-2 '>Imprint</a>
            <a className='text-gray-600 mr-3 mt-2 '>Ads Info</a>
            <a className='text-gray-600 mr-3 mt-2 '>More ···</a>
            <a className='text-gray-600 mr-3 mt-2 '>© 2021 Twitter, Inc.</a>
          </div>
        </div>
      }
    </div>
  );
};

export default App;


