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
    lockedDice: Array<boolean>;
    lockedFields: Array<boolean>,
    currentRoll: number;
}


class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            diceValues: Array.from({length: 5}, () => this.roll()),
            lockedDice: Array(5).fill(false),
            lockedFields: [
                ...Array(6).fill(false),
                ...Array(3).fill(true),
                ...Array(7).fill(false),
                ...Array(3).fill(true)],
            currentRoll: 1,
        }
    }


    render() {
        return (
            <div className="App">
                <div className="App-body">
                    <Board diceValues={this.state.diceValues}
                           lockedFields={this.state.lockedFields}
                           lockField={(i: number) => this.lockField(i)}
                    />
                    <Dice values={this.state.diceValues}
                          lockedDice={this.state.lockedDice}
                          lockDie={(i: number) => this.lockDie(i)}
                          shuffleDice={() => this.shuffle()}
                    />
                </div>
            </div>);
    }


    lockDie(i: number) {
        const nextLockedDice = this.state.lockedDice;
        nextLockedDice[i] = !nextLockedDice[i];
        this.setState({lockedDice: nextLockedDice});
    }

    lockField(i: number) {
        const nextLockedFields = this.state.lockedFields;
        nextLockedFields[i] = true;
        this.setState({
            diceValues: Array.from({length: 5}, () => this.roll()),
            lockedFields: nextLockedFields,
            lockedDice: Array(5).fill(false),
            currentRoll: 1
        });
    }

    shuffle() {
        console.log("shuffle")
        console.log(this.state.currentRoll)
        if (this.state.currentRoll <= 2) {
            const nextValues = this.state.diceValues.map((value, index) => {
                if (!this.state.lockedDice[index])
                    return this.roll()
                return value
            });
            if (this.state.currentRoll === 2) {
                this.setState({lockedDice: Array(5).fill(true)})
            }
            this.setState({
                diceValues: nextValues,
                currentRoll: this.state.currentRoll + 1
            });
        }
    }


    roll(): number {
        return Math.ceil(Math.random() * 6);
    }
}

export default App;
