import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [tweetList, setTweetList] = useState([]);
  const history = useHistory();
  const [trendData, setTrendData] = useState(
    [
      {
        country: "Turkey",
        header: "Atatürk",
        tweets: 1509000
      },
      {
        country: "Turkey",
        header: "Revolotion",
        tweets: 50980
      },
      {
        country: "Turkey",
        header: "Galatasaray",
        tweets: 150000
      }
    ]);

  const login = (userData, userToken) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser({});
    history.push("/")
  };

  return (
    <UserContext.Provider value={{ user, login, logout, token, trendData, tweetList, setTweetList }}>
      {children}
    </UserContext.Provider>
  );
};
