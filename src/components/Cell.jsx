//import React from 'react';
//import styles from './Cell.css';

function Cell(props) {
  const height = 20;
  const width = 20;
  const { ctx, x, y } = props;
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(x, y, width, height);
}

export default Cell;
