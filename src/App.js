import React, { Component } from 'react';
import Game from './components/Game';
import styled, { injectGlobal } from 'styled-components';

//eslint-disable-next-line
injectGlobal`
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Helvetica;
    box-sizing: border-box;
  }

  * {
    font-family: inherit;
    box-sizing: inherit;
   }
`;

const Title = styled.h1`
  font-weight: 800;
  text-shadow: 0.5px 1px 0px grey;
  color: white;
  width: 100%;
  text-align: center;
`;

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: skyBlue;
  padding: 2em;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Title>Game Of Life</Title>
        <Game />
      </AppWrapper>
    );
  }
}

export default App;
