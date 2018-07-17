import React, { Component } from 'react';
import logo from './logo.svg';
import { USER_MOVE } from './constants/actionTypes';
import Table from './components/Table';
import Game from './components/Game';
import OnlineGameForm from './components/OnlineGameForm';
import './App.css';



class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <OnlineGameForm />          
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
