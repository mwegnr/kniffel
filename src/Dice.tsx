import React, {Component} from "react";
import Die from "./Die";


interface IProps {
}

interface IState {
    values: Array<number>;
}

class Dice extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            values: Array(5).fill(1),
        }
    }

    render() {
        return (
            <div className="row" onClick={() => this.handleClick()}>
                <Die value={this.state.values[0]}/>
                <Die value={this.state.values[1]}/>
                <Die value={this.state.values[2]}/>
                <Die value={this.state.values[3]}/>
                <Die value={this.state.values[4]}/>
            </div>
        )
    }

    handleClick() {
        this.setState({
            values: this.state.values.map(() => Math.ceil(Math.random() * 6))
        })
    }

}

export default Dice