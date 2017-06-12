import React, { Component } from 'react';
import Cell from './Cell.jsx';

class Game extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateCanvas();
  }

  createLifeAtRandom(gridWidth, cellArea) {
    const possibleRows = gridWidth / cellArea;
    const theGrid = Array.from({ length: possibleRows }, (row, i) => {
      row = Array.from({ length: possibleRows }, column => {
        column = Math.floor(Math.random() * 2);
        return column;
      });
      return row;
    });
    return theGrid;
  }

  findNeighbours(theGrid, x, y) {
    if (x + 1 > 29 || x - 1 < 0 || y + 1 > 29 || y - 1 < 0) return 0;
    const left = theGrid[x][y - 1];
    const right = theGrid[x][y + 1];
    const top = theGrid[x + 1][y];
    const bottom = theGrid[x][y + 1];
    const topLeft = theGrid[x + 1][y - 1];
    const topRight = theGrid[x + 1][y + 1];
    const bottomLeft = theGrid[x - 1][y - 1];
    const bottomRight = theGrid[x - 1][y + 1];

    const totalNeighbour = [
      left,
      right,
      top,
      bottom,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight
    ].reduce((acc, direction) => {
      if (direction) {
        acc += direction;
        return acc;
      }
      return acc;
    }, 0);
    return totalNeighbour;
  }

  aliveOrDead(neighbours) {
    switch (true) {
      case neighbours > 3:
        return false;
      case neighbours >= 2:
        return true;
      case neighbours === 3:
        return true;
      case neighbours === 2:
        return true;
      case neighbours < 2:
        return false;
      default:
        return true;
    }
  }

  updateCanvas() {
    const grdH = 600;
    const grdW = 600;
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 600);
    //Draw Children
    //console.log('createArray', this.createLifeAtRandom(grdW, 20));
    const initGrid = this.createLifeAtRandom(grdW, 20);
    initGrid.forEach((rowElement, i) => {
      if (Array.isArray(rowElement)) {
        rowElement.forEach((item, j) => {
          if (item === 1) {
            let neighbours = this.findNeighbours(initGrid, i, j);
            let alive = this.aliveOrDead(neighbours);
            if (alive) {
              Cell({ ctx, x: 20 * i, y: 20 * j });
            }
          }
        });
      }
    });
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
