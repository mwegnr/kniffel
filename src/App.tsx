import React from 'react';
import './App.css';
import './Dice/Die';
import './Dice/Dice'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import Dice from "./Dice/Dice";
import Board from "./Board/Board";

library.add(fas)

function App() {
    return (
        <div className="App">
            <div className="App-body">
                <Board/>
                <Dice/>
            </div>
        </div>);
}

export default App;
