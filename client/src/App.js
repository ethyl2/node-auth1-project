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
      <Route exact path='/' component={Home} />

      <Route path='/register' render={props => <Register {...props} registerUser={registerUser} 
        isRegistered={isRegistered} 
        username={user.username}/>} />

      <Route path='/login' render={props => <Login {...props} setUser={setUser} />} />

      <Route path='/users' component={Users} />
    </div>
  );
}

export default App;
