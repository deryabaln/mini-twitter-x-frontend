import React, { useEffect, useState } from "react";
import { useUser } from '../hooks/UserContext';
import axios from "axios";
import TweetCard from "./TweetCard";
import './Home.css';
import { useForm } from "react-hook-form";

const Home = () => {
  const { user, token, tweetList, setTweetList } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues:
    {
      content: "",
      user: user,
      likes: [],
      retweets: [],
      comments: [],
    }
  });

  const handleTweetSubmit = (tweet) => {
    axios
      .post(
        "http://localhost:8000/tweet/",
        tweet,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
        setTweetList(updatedTweetList);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [token, user]);


  return (
    <div className="home">
      <div className="home-header">
        <h3>Home</h3>
        <img id="header-pic" src={require(`./Png/home.png`)} alt="" />
      </div>
      <div className="write-tweet">
        <img id="my-profile-pic" src={require(`./Png/Picture1.png`)} alt="" />
        <div className="write">
          <form onSubmit={handleSubmit(handleTweetSubmit)}>
            <input
              type="text"
              name="content"
              placeholder="What’s happening"
              {...register("content", {
                required: "Content must not empty ",
                maxLength: {
                  value: 140,
                  message: "Content must be 140 characters or less",
                },
              })}
              className="tweet-input"
            />
            <div className="section">
              <div className="section-pic-div">
                <img id="section-pic" src={require(`./Png/tweet1.png`)} alt="" />
                <img id="section-pic" src={require(`./Png/tweet2.png`)} alt="" />
                <img id="section-pic" src={require(`./Png/tweet3.png`)} alt="" />
                <img id="section-pic" src={require(`./Png/tweet4.png`)} alt="" />
                <img id="section-pic" src={require(`./Png/tweet5.png`)} alt="" />
              </div>
              <button id="tweet-button" type="submit">Tweet</button>
            </div>
            {errors.content && <p className="text-red-700 p-0 mb-4">{errors.content.message}</p>}
          </form>
        </div>
      </div>
      <TweetCard tweetList={tweetList} />
    </div>
  );
};

export default Home;
