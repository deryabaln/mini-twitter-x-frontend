import './profile.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';
import TweetCard from './TweetCard';

const Profile = () => {
  const { user, token, tweetList, setTweetList } = useUser();
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/tweet/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const updatedTweetList = res.data.reverse().map((tweet) => {
          const isRetweeted = tweet.retweets.some((retweetedUser) => retweetedUser.id === user.id);
          const isLiked = tweet.likes.some((likedUser) => likedUser.id === user.id);
          return {
            ...tweet,
            isLiked,
            isRetweeted,
          };
        });
        const userTweets = updatedTweetList.filter((tweet) => tweet.user.id === user.id);
        setTweetList(userTweets);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [token, user]);

  const goBack = () => { history.push("/home") }

  return (
    <div className='profile-container'>
      <div className='profile-header'>
        <img onClick={goBack} src={require(`./Png/backbutton.png`)} alt="" ></img>
        <div className='flex flex-col mt-2 '>
          <h3 className='font-bold text-sm '> {user.firstName} {user.lastName}</h3>
          <span className='text-gray-600 text-xs '>{tweetList.length} Tweets</span>
        </div>
      </div>
      <img id="cover" src={require(`./Png/cover.png`)} alt="" ></img>
      <img className="profile-img" src={require(`./Png/Picture1.png`)} alt="" />
      <div className='description'>
        <h3 className='font-bold text-sm '>{user.firstName} {user.lastName}</h3>
        <p className='text-gray-600 text-sm mb-4' > @{user.email.split("@")[0]}</p>
        <p>This is my twitter profile</p>
        <div className='flex flex-row mt-4 text-gray-600 text-sm '>
          <div className="profile-description">
            <img src={require(`./Png/location.png`)} alt="" />
            <span>Türkiye</span>
          </div>
          <div className="profile-description">
            <img src={require(`./Png/connect.png`)} alt="" />
            <a href='https://github.com/deryabaln'>Github</a>
          </div>
          <div className="profile-description">
            <img src={require(`./Png/birthday.png`)} alt="" />
            <span>{user.birthDate}</span>
          </div>
          <div className="profile-description">
            <img src={require(`./Png/calender.png`)} alt="" />
            <span>15.09.2023</span>
          </div>
        </div>
        <div className='flex flex-row mt-4 text-gray-600 text-sm '>
          <p className='mr-6 '><span className='font-bold text-black'>123</span> Following</p>
          <p><span className='font-bold text-black'>321</span> Followers</p>
        </div>
        <div className='flex flex-row mt-4 text-sm '>
          <a href='/profile' >Tweets</a>
          <a>Tweets & replies</a>
          <a>Media</a>
          <a>Likes</a>
        </div>
      </div>
      <TweetCard tweetList={tweetList} />
    </div>
  );
};

export default Profile;
