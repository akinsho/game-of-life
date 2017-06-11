import React, { Component } from 'react';
import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Game Of Life</h2>
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
