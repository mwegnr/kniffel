import React, {Component} from "react";
import Field from "./Field";
import './Board.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface IProps {
    diceValues: Array<number>;
}

interface IState {
    fieldValues: Array<number>,
    fieldLockedStates: Array<boolean>,
}

class Board extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            fieldValues: Array(19).fill(0),
            fieldLockedStates: Array(19).fill(false)
        }
        this.lockResultFields()
    }

    renderIconLabel(icon: string) {
        return (
            <div>
                <FontAwesomeIcon icon={`${icon}` as IconProp} className='board-icon'/>
                <FontAwesomeIcon icon={`${icon}` as IconProp} className='board-icon'/>
                <FontAwesomeIcon icon={`${icon}` as IconProp} className='board-icon'/>
            </div>
        )
    }

    renderSingleLabel(label: any) {
        return (
            <tr>
                <td className='cell'>{label}</td>
            </tr>
        )
    }

    renderLabels() {
        return (<table>
            <tbody>
            {this.renderSingleLabel(this.renderIconLabel('dice-one'))}
            {this.renderSingleLabel(this.renderIconLabel('dice-two'))}
            {this.renderSingleLabel(this.renderIconLabel('dice-three'))}
            {this.renderSingleLabel(this.renderIconLabel('dice-four'))}
            {this.renderSingleLabel(this.renderIconLabel('dice-five'))}
            {this.renderSingleLabel(this.renderIconLabel('dice-six'))}
            {this.renderSingleLabel("Total")}
            {this.renderSingleLabel("Bonus")}
            {this.renderSingleLabel("Total (Upper)")}
            {/*{this.renderSingleLabel("Three of a kind")}*/}
            {/*{this.renderSingleLabel("Four of a kind")}*/}
            {/*{this.renderSingleLabel("Full House")}*/}
            {/*{this.renderSingleLabel("Small Straight")}*/}
            {/*{this.renderSingleLabel("Large Straight")}*/}
            {/*{this.renderSingleLabel("Yahtzee")}*/}
            {/*{this.renderSingleLabel("Chance")}*/}
            {/*{this.renderSingleLabel("Total (Lower)")}*/}
            {/*{this.renderSingleLabel("Total (Upper)")}*/}
            {/*{this.renderSingleLabel("Grand Total")}*/}
            </tbody>
        </table>)
    }


    renderSingleField(i: number, calcValue: () => number, isResultField = false) {
        return <Field locked={this.state.fieldLockedStates[i]}
                      value={this.state.fieldValues[i]}
                      isResultField={isResultField}
                      calcValue={() => calcValue()}
                      setValue={(value: number) => this.setFieldValue(i, value)}
                      onClick={() => this.lockField(i)}
        />
    }

    renderFields() {
        return (
            <table>
                <tbody>
                {this.renderSingleField(0, () => this.calcValueNumber(1))}
                {this.renderSingleField(1, () => this.calcValueNumber(2))}
                {this.renderSingleField(2, () => this.calcValueNumber(3))}
                {this.renderSingleField(3, () => this.calcValueNumber(4))}
                {this.renderSingleField(4, () => this.calcValueNumber(5))}
                {this.renderSingleField(5, () => this.calcValueNumber(6))}
                {this.renderSingleField(6, () => this.calcUpperTotalNoBonus(), true)}
                {this.renderSingleField(7, () => this.calcBonus(), true)}
                {this.renderSingleField(8, () => this.calcUpperBonus(), true)}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div className='board-row'>
                {this.renderLabels()}
                {this.renderFields()}
            </div>
        )
    }

    lockResultFields() {
        this.lockField(6)
        this.lockField(7)
        this.lockField(8)
    }

    lockField(i: number) {
        const nextLockedFields = this.state.fieldLockedStates;
        nextLockedFields[i] = true;
        this.setState({fieldLockedStates: nextLockedFields});
    }

    setFieldValue(i: number, value: number) {
        const nextFieldValues = this.state.fieldValues;
        nextFieldValues[i] = value
        this.setState({fieldValues: nextFieldValues})
    }

    calcValueNumber(fieldNumber: number): number {
        return this.props.diceValues
            .filter((value) => value === fieldNumber)
            .reduce((total, current) => total + current, 0)
    }

    calcUpperTotalNoBonus(): number {
        return this.state.fieldValues
            .slice(0, 6)
            .reduce((total, current) => total + current, 0)
    }

    calcBonus(): number {
        if (this.calcUpperTotalNoBonus() >= 63) {
            return 35
        }
        return 0
    }

    calcUpperBonus(): number {
        return this.calcUpperTotalNoBonus() + this.calcBonus()
    }

}

export default Board