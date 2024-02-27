import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const defaultImg ='avatar.jpg';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/users/${searchQuery}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setUserData(null);
    }
  };

  return (
    <div className="App">
      <h3 className='title'>devfinder</h3>
      <div className='Search-wrapper Container-bg'>
        <form onSubmit={handleSubmit} className='Search-form'>
          <input
          className='search-input'
            type="text"
            value={searchQuery}
            onChange={handleChange}
          />
          <button className='Search-btn' type="submit">Search</button>
        </form>
        {error && <p className='Error'>{error}</p>}
      </div>
      
      <div className='Container-bg Data-wrap'>
        {userData && (
          <div className="User-info">
            <div className='User'>
            <div className='User-image'> <img src={userData.avatar_url ? userData.avatar_url : defaultImg}/></div>
            <h2 className='User-name'>{userData.login}</h2>
            </div>
           <div>
            <p>Followers: {userData.followers}</p>
            <p>Following: {userData.following}</p>
            <p>Public Repos: {userData.public_repos}</p>
            <p>Location: {userData.location}</p>
            <p>Profile: <a href={userData.html_url}>{userData.html_url}</a></p>
            </div>
          </div>
        )}
      </div>
     
    </div>
  );
}

export default App;
