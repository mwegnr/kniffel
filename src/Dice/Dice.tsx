import React, {Component} from "react";
import Die from "./Die";
import "./Dice.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";


interface IProps {
}

interface IState {
    values: Array<number>;
    lockedDice: Array<boolean>;
}

class Dice extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            values: Array(5).fill(1),
            lockedDice: Array(5).fill(false),
        }
    }

    renderDie(i: number) {
        return (<Die value={this.state.values[i]}
                     locked={this.state.lockedDice[i]}
                     onClick={() => this.lock(i)}/>)
    }

    render() {
        return (
            <div className="dice-row">
                {this.state.values.map((_, index) => this.renderDie(index))}
                <FontAwesomeIcon icon={`shuffle` as IconProp} onClick={() => this.shuffle()}
                                 className='dice-icon small'/>
            </div>
        )
    }

    lock(i: number) {
        const nextLockedDice = this.state.lockedDice;
        nextLockedDice[i] = !nextLockedDice[i];
        this.setState({lockedDice: nextLockedDice});
    }

    shuffle() {
        const nextValues = this.state.values.map((value, index) => {
            if (!this.state.lockedDice[index]) return this.roll()
            return value
        });

        this.setState({
            values: nextValues,
        });
    }

    roll(): number {
        return Math.ceil(Math.random() * 6);
    }

}

export default Dice