import React, { Component } from 'react';
import styled from 'styled-components';
import Cell from './Cell.jsx';

const PrimordialOoze = styled.div`
  border: 5px solid grey;
  background-color: black;
  box-shadow: 0.5px 1px 0 rgba(0, 0, 0, 0.5),
              1.0px 1.5px 0 rgba(0, 0, 0, 0.5),
`;

const Controls = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center
`;

const Stop = styled.button`
  width: 10em;
  height: 3em;
  border: none;
  box-shadow: 0 1px 0 grey;
  margin-top: 1em;
  font-weight: 750;
  background-color: tomato;
`;

class Game extends Component {
  state = {
    loopId: null,
    grid: [],
    size: 600,
    cell: {
      height: 10,
      width: 10
    }
  };
  componentDidMount() {
    this.setState({ grid: this.grid, loopId: setInterval(this.loop, 200) });
  }

  grid = this.createLifeAtRandom(this.state.size, this.state.cell.height);

  componentDidUpdate(prevProps, prevState) {
    this.updateCanvas();
  }

  componentWillUnmount() {
    this.stopLoop(this.state.loopId);
  }

  loop = () => {
    this.updateCanvas();
  };

  stopLoop = () => {
    clearInterval(this.state.loopId);
  };

  createLifeAtRandom(gridWidth, cellArea) {
    const possibleSize = gridWidth / cellArea;
    const theGrid = Array.from({ length: possibleSize }, (row, i) => {
      row = Array.from({ length: possibleSize }, column => {
        column = Math.floor(Math.random() * 2);
        return column;
      });
      return row;
    });
    return theGrid;
  }

  findNeighbours(theGrid, x, y) {
    const outer = theGrid.length - 1;
    let up = x + 1 > outer ? 0 : x + 1;
    let right = y + 1 > outer ? 0 : y + 1;
    let left = y - 1 < 0 ? 0 : y - 1;
    let down = x - 1 < 0 ? 0 : x - 1;
    const leftN = theGrid[x][left];
    const rightN = theGrid[x][right];
    const top = theGrid[up][y];
    const bottom = theGrid[down][y];
    const topLeft = theGrid[up][left];
    const topRight = theGrid[up][right];
    const bottomLeft = theGrid[down][left];
    const bottomRight = theGrid[down][right];

    const totalNeighbour = [
      leftN,
      rightN,
      top,
      bottom,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight
    ].reduce((acc, direction) => acc + direction, 0);
    return totalNeighbour;
  }

  determineSurvivors(neighbours, isAlive) {
    //console.log('neighbours', neighbours);
    switch (true) {
      case neighbours > 3:
        return false;
      case neighbours === 3:
        return true;
      case neighbours === 2:
      case neighbours === 2 && isAlive:
        return true;
      case neighbours < 2 && isAlive:
        return false;
      default:
        return false;
    }
  }

  updateCanvas() {
    const { height, width } = this.state.cell;
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 600);
    //Draw Children - this is a Mutation as grid is perpetually reassigned;
    this.grid = this.grid.map(
      (rowElement, i) =>
        Array.isArray(rowElement)
          ? rowElement.map((item, j) => {
              let wasAlive = this.state.grid[i][j] === 1 && item === 0;
              let isAlive = item === 1;
              let neighbours = this.findNeighbours(this.grid, i, j);
              let shouldLive = this.determineSurvivors(neighbours, isAlive);
              if (wasAlive || isAlive) {
                if (shouldLive) {
                  item = 1;
                  Cell({ ctx, height, width, x: height * i, y: height * j });
                } else {
                  item = 0;
                }
              }
              return item;
            })
          : new Error('the Grid must be an array of arrays')
    );
    //console.log('theGrid', this.grid);
  }

  render() {
    return (
      <Controls>
        <PrimordialOoze>
          <canvas
            ref="canvas"
            width={this.state.size}
            height={this.state.size}
          />
        </PrimordialOoze>
        <Stop onClick={this.stopLoop}>Stop All Life</Stop>
      </Controls>
    );
  }
}

export default Game;
