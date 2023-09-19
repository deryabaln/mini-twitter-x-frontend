import { useEffect, useState } from 'react';
import './TweetCard.css';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useUser } from '../hooks/UserContext';

const TweetDetail = () => {
    const { id } = useParams();
    const { token, user } = useUser();
    const [tweet, setTweet] = useState({});
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState([]);
    const userId = user.id;

    const handleCommentChange = (e) => {
        const { value } = e.target;
        setComment(value);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/tweet/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setTweet(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
        axios
            .get(`http://localhost:8000/tweet/comment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setCommentList(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id, token]);

    const handleCommentSubmit = () => {
        axios
            .post(
                `http://localhost:8000/tweet/comment/${id}/${userId}`,
                comment,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'text/plain; charset=utf-8',
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                setComment("");
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    if (!tweet) {
        return <div>Loading...</div>;
    }
    const handleDeleteComment = (commentId) => {
        axios
            .delete(
                `http://localhost:8000/tweet/commentDelete/${commentId}`,
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

    return (
        <div className="tweetCard-container">
            <div key={tweet.id} className="tweetDetail-card" style={{
                width: "100%",
                padding: "2% 5%",
                display: "flex",
                flexDirection: "row",
                borderBottom: "1.3px solid #E4EAED",
                borderLeft: "1.3px solid #E4EAED",
                borderRight: "1.3px solid #E4EAED",
                background: "azure"
            }}>
                <img id="profile-pic" src={require(`./Png/Picture1.png`)} alt="" />
                <div className="user-information">
                    <h5 className="text-slate-500">
                        <span className="text-black , font-bold">
                            {tweet.user && tweet.user.firstName} {tweet.user && tweet.user.lastName}
                        </span> @{tweet.user && tweet.user.email.split("@")[0]}
                    </h5>
                    <p className="text">{tweet.content}</p>
                </div>
            </div>
            <div className="write-comment" style={{
                width: "100%",
                padding: "2% 5%",
                display: "flex",
                flexDirection: "row",
                borderBottom: "1.3px solid #E4EAED",
                borderLeft: "1.3px solid #E4EAED",
                borderRight: "1.3px solid #E4EAED"
            }}>
                <img id="my-profile-pic" src={require(`./Png/Picture1.png`)} alt="" />
                <div className="write">
                    <input
                        type="text"
                        name="text"
                        placeholder="Add a comment..."
                        value={comment.text}
                        onChange={handleCommentChange}
                        className="tweet-input"
                    />
                    <button id="comment-button"
                        style={{ width: "18%", padding: "1% 0%", marginLeft: "80%", border: "none", background: "#1DA1F2", color: "white" }}
                        onClick={handleCommentSubmit}>Comment</button>
                </div>
            </div>
            <div style={{
                width: "100%",
                padding: "2% 5%",
                display: "flex",
                flexDirection: "row",
                borderBottom: "1.3px solid #E4EAED",
                borderLeft: "1.3px solid #E4EAED",
                borderRight: "1.3px solid #E4EAED",
            }}>
                {commentList.length !== 0 ?
                    <h2 className='text-base m-0'> Comments of This Tweet</h2> :
                    <p>There are no comments on this tweet yet.</p>}
            </div>
            <div className="tweetCard-container">
                {commentList.map((comment) => (
                    <div key={comment.id} style={{
                        borderBottom: "1.3px solid #E4EAED",
                        borderLeft: "1.3px solid #E4EAED",
                        borderRight: "1.3px solid #E4EAED"
                    }}>
                        <div className="dropdown" style={{ width: "5%", margin: "0", marginLeft: "90%" }}>
                            <button style={{ padding: "0", border: "none" }}>...</button>
                            {comment.user.id === user.id ? (
                                <div className="dropdown-content">
                                    <button onClick={() => handleDeleteComment(comment.id)} style={{ color: "red", padding: "1%", border: "none" }} id="button2">delete</button>
                                </div>
                            ) : null}
                        </div>
                        <div className="comment-card" style={{
                            width: "100%",
                            padding: "2% 5%",
                            display: "flex",
                            flexDirection: "row",
                        }}>
                            <img id="profile-pic" src={require(`./Png/Picture1.png`)} alt="" />
                            <div className="user-information">
                                <h5 className="text-slate-500">
                                    <span className="text-black , font-bold">{comment.user.firstName} {comment.user.lastName}</span>
                                    @{comment.user.email.split("@")[0]}
                                </h5>
                                <p className="text">
                                    <span className="text-black , font-bold">@{tweet.user && tweet.user.email.split("@")[0]}</span>
                                    {"  " + comment.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TweetDetail;
