import React from 'react';
import './App.css';
import './Dice/Die';
import './Dice/Dice'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import Dice from "./Dice/Dice";

library.add(fas)

function App() {
    return (
        <div className="App">
            <div className="App-body">
                <Dice/>
            </div>
        </div>);
}

export default App;
