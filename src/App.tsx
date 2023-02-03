import React from 'react';
import './App.css';
import './Dice/Die';
import './Dice/Dice'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import Dice from "./Dice/Dice";
import Board from "./Board/Board";

library.add(fas)


interface IProps {
}

interface IState {
    diceValues: Array<number>;
    diceLocked: Array<boolean>;
}


class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            diceValues: Array(5).fill(1),
            diceLocked: Array(5).fill(false),
        }
    }


    render() {
        return (
            <div className="App">
                <div className="App-body">
                    <Board diceValues={this.state.diceValues}/>
                    <Dice values={this.state.diceValues}
                          lockedDice={this.state.diceLocked}
                          lockDie={(i: number) => this.lockDie(i)}
                          shuffleDice={() => this.shuffle()}
                    />
                </div>
            </div>);
    }


    lockDie(i: number) {
        const nextLockedDice = this.state.diceLocked;
        nextLockedDice[i] = !nextLockedDice[i];
        this.setState({diceLocked: nextLockedDice});
    }

    shuffle() {
        const nextValues = this.state.diceValues.map((value, index) => {
            if (!this.state.diceLocked[index]) return this.roll()
            return value
        });

        this.setState({
            diceValues: nextValues,
        });
    }

    roll(): number {
        return Math.ceil(Math.random() * 6);
    }
}

export default App;
