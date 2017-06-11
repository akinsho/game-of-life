import React, { Component } from 'react';
import styles from './Game.css';
import Cell from './Cell.jsx';

class Game extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateCanvas();
  }

  createArray(rows) {
    const arr = [];
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
    }
    return arr;
  }

  createLifeAtRandom(theGrid, gridWidth, gridHeight) {
    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const random = Math.floor(Math.random() * 2);
        random === 1 ? (theGrid[i][j] = 1) : (theGrid[i][j] = 0);
      }
    }
    return theGrid;
  }

  updateCanvas() {
    const grdH = 600;
    const grdW = 600;
    const theGrid = this.createArray(600);
    const initGrid = this.createLifeAtRandom(theGrid, grdH, grdW);
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 600);
    //Draw Children
    for (let i = 1; i < grdH; i++) {
      for (let j = 1; j < grdW; j++) {
        if (initGrid[i][j] === 1) {
          Cell({ ctx, x: i, y: j });
        }
      }
    }
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={600} height={600} />
      </div>
    );
  }
}

export default Game;
