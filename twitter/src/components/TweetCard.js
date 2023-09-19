import { useEffect, useState } from 'react';
import './TweetCard.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useUser } from '../hooks/UserContext';

const TweetCard = ({ tweetList }) => {
  const [commentList, setCommentList] = useState([]);
  const history = useHistory();
  const { user, token, setTweetList } = useUser();

  useEffect(() => {
    tweetList.forEach((tweet) => {
      axios
        .get(`http://localhost:8000/tweet/comment/${tweet.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setCommentList((prevComments) => ({
            ...prevComments,
            [tweet.id]: res.data,
          }));
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
  }, [token, tweetList]);

  if (tweetList.length === 0) {
    return <div>No tweets have been posted yet</div>;
  }

  const toggleRetweet = (tweetId) => {
    setTweetList((prevTweetList) => {
      return prevTweetList.map((tweet) => {
        if (tweet.id === tweetId) {
          const userIndex = tweet.retweets.findIndex((retweetedUser) => retweetedUser.id === user.id);
          const updatedRetweets = [...tweet.retweets];

          if (userIndex === -1) {
            updatedRetweets.push(user);
          } else {
            updatedRetweets.splice(userIndex, 1);
          }
          const updatedTweet = {
            ...tweet,
            isRetweeted: userIndex === -1,
            retweets: updatedRetweets,
          };

          const endpoint = `http://localhost:8000/tweet/retweet/${tweetId}`;
          const method = userIndex === -1 ? "POST" : "DELETE";

          axios({
            method,
            url: endpoint,
            data: user,
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
            .then((res) => {
              console.log(res.data);
              setTweetList((prevTweetList) => {
                return prevTweetList.map((prevTweet) =>
                  prevTweet.id === tweetId ? updatedTweet : prevTweet
                );
              });
            })
            .catch((err) => {
              console.log(err.response);
            });

          return updatedTweet;
        }

        return tweet;
      });
    });
  };


  const toggleLike = (tweetId) => {
    setTweetList((prevTweetList) => {
      return prevTweetList.map((tweet) => {
        if (tweet.id === tweetId) {
          const userIndex = tweet.likes.findIndex((likedUser) => likedUser.id === user.id);
          const updatedLikes = [...tweet.likes];

          if (userIndex === -1) {
            updatedLikes.push(user);
          } else {
            updatedLikes.splice(userIndex, 1);
          }
          const updatedTweet = {
            ...tweet,
            isLiked: userIndex === -1,
            likes: updatedLikes,
          };

          const endpoint = `http://localhost:8000/tweet/like/${tweetId}`;
          const method = userIndex === -1 ? "POST" : "DELETE";

          axios({
            method,
            url: endpoint,
            data: user,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
              console.log(res.data);
              setTweetList((prevTweetList) => {
                return prevTweetList.map((prevTweet) =>
                  prevTweet.id === tweetId ? updatedTweet : prevTweet
                );
              });
            })
            .catch((err) => {
              console.log(err.response);
            });

          return updatedTweet;
        }

        return tweet;
      });
    });
  };

  const toggleEditPanel = (tweetId) => {
    setTweetList((prevTweetList) => {
      return prevTweetList.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            isEditPanelVisible: !tweet.isEditPanelVisible,
          };
        }
        return tweet;
      });
    });
  };

  const handleEditContentChange = (tweetId, newContent) => {
    setTweetList((prevTweetList) => {
      return prevTweetList.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            content: newContent,
          };
        }
        return tweet;
      });
    });
  };

  const handleTweetSubmit = (id, tweet) => {
    axios
      .put(
        `http://localhost:8000/tweet/${id}`,
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

  const handleDeleteTweet = (tweetId) => {
    axios
      .delete(
        `http://localhost:8000/tweet/${tweetId}`,
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
  }


  const toggleComment = (tweetId) => {
    history.push(`/tweet/${tweetId}`);
    window.location.reload();
  };

  return (
    <div className="tweetCard-container">
      {tweetList.map((tweet) => (
        <div key={tweet.id}>
          <div className="dropdown" style={{ width: "5%", margin: "0", marginLeft: "90%" }}>
            <button style={{ padding: "0", border: "none" }}>...</button>
            {tweet.user.id === user.id ? (
              <div className="dropdown-content" id="dropdownContent">
                <button onClick={() => handleDeleteTweet(tweet.id)} style={{ color: "red", padding: "1%", border: "none" }} id="button2">Delete</button>
                <button onClick={() => toggleEditPanel(tweet.id)} style={{ color: "#1DA1F2", padding: "1%", border: "none" }} id="button1">Edit</button>
              </div>
            ) : null}
          </div>
          <div className="tweet-card">
            <img id="profile-pic" src={require(`./Png/Picture1.png`)} alt="" />
            <div className="user-information">
              <h5 className="text-slate-500">
                <span className="text-black , font-bold">{tweet.user.firstName} {tweet.user.lastName}</span> @{tweet.user.email.split("@")[0]}
              </h5>
              <p className="text">{tweet.content}</p>
              <div className="tweet-pic">
                <div className="tweetcard-pic">
                  <img
                    id="tweetcard-pic"
                    src={require(`./Png/comment.png`)}
                    alt=""
                    onClick={() => toggleComment(tweet.id)}
                  />
                  {commentList[tweet.id] && commentList[tweet.id].length !== 0 && (
                    <p className="text-slate-500 text-xs ">{commentList[tweet.id].length}</p>
                  )}
                </div>
                <div className="tweetcard-pic">
                  <img
                    id="tweetcard-pic"
                    src={tweet.isRetweeted ? require('./Png/retweet.png') : require('./Png/retweetnon.png')}
                    alt=""
                    onClick={() => toggleRetweet(tweet.id)}
                  />
                  {tweet.retweets.length !== 0 && <p className="text-slate-500 text-xs ">{tweet.retweets.length}</p>}
                </div>
                <div className="tweetcard-pic">
                  <img
                    id="tweetcard-pic"
                    src={tweet.isLiked ? require('./Png/like.png') : require('./Png/likenon.png')}
                    alt=""
                    onClick={() => toggleLike(tweet.id)}
                  />
                  {tweet.likes.length !== 0 && <p className="text-slate-500 text-xs">{tweet.likes.length}</p>}
                </div>
                <div className="tweetcard-pic">
                  <img id="tweetcard-pic" src={require(`./Png/share.png`)} alt="" />
                </div>
                <div className="tweetcard-pic">
                  <img id="tweetcard-pic" src={require(`./Png/data.png`)} alt="" />
                </div>
              </div>
            </div>
          </div>
          {tweet.isEditPanelVisible && (
            <div className="write-tweet">
              <div className="write">
                <input
                  type="text"
                  name="content"
                  placeholder="What’s happening"
                  value={tweet.content}
                  onChange={(e) => handleEditContentChange(tweet.id, e.target.value)}
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
                  <button id="tweet-button" onClick={() => handleTweetSubmit(tweet.id, tweet)}>Tweet</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TweetCard;