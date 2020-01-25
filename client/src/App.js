import React, { useState } from 'react';
import axios from 'axios';
import owl from './images/animals/owl.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Users from './components/Users'
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [user, setUser ] = useState({username: '', password: ''});
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const registerUser = user => {
    axios.post('http://localhost:9000/api/register', user)
      .then(response => {
        console.log(response)
        setUser(response.data);
        setIsRegistered(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loginUser = user => {
    axios.post('http://localhost:9000/api/login', user)
      .then(response => {
        console.log(response)
        setUser(user);
        setIsLoggedIn(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={owl} className="App-logo" alt="logo" />
        <h1>
          Forest Friends and Foes
        </h1>
        <nav>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
          <Link to='/users'>Friends</Link>
          <Link to='/home'>Home</Link>
        </nav>
      </header>

      <div className='main-content'>

        <Route exact path='/' component={Home} />

        <Route path='/register' render={props => <Register {...props} 
          registerUser={registerUser} 
          isRegistered={isRegistered} 
          username={user.username} />} />

        <Route path='/login' render={props => <Login {...props} 
          loginUser={loginUser}
          isLoggedIn={isLoggedIn}
          username={user.username} />} />

        <Route path='/users' render={props => <Users {...props}
          user={user}
          isLoggedIn={isLoggedIn} />} />

      </div>

      <footer>
        <p> © 2020 Heather Nuffer</p>
        <p>Animal icons are from <a href='https://www.stockio.com/free-icon/fox'>stockio.com</a></p>
      </footer>

    </div>
  );
}

export default App;
