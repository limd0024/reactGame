import React from 'react';
import Board from './Board';
import './App.css';
import { HashRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter basename='/'>
        <Board />
      </HashRouter>
    </div>
  );

}

export default App;
