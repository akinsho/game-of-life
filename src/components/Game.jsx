import React, { Component } from 'react';
import styles from './Game.css';

function rect(props) {
  const { ctx, x, y, width, height } = props;
  ctx.fillRect(x, y, width, height, height);
}

class Game extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 600);
    //Draw Children
    rect({ ctx, x: 10, y: 10, width: 50, height: 50 });
    rect({ ctx, x: 110, y: 110, width: 50, height: 50 });
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
