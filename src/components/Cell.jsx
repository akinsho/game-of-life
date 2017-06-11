import React from 'react';
import styles from './Cell.css';

function Cell(props) {
  const height = 1;
  const width = 1;
  const { ctx, x, y } = props;
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(x, y, width, height);
}

export default Cell;
