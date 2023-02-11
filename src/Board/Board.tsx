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
            {this.renderSingleLabel("Three of a kind")}
            {this.renderSingleLabel("Four of a kind")}
            {this.renderSingleLabel("Full House")}
            {this.renderSingleLabel("Small Straight")}
            {this.renderSingleLabel("Large Straight")}
            {this.renderSingleLabel("Yahtzee")}
            {this.renderSingleLabel("Chance")}
            {this.renderSingleLabel("Total (Lower)")}
            {this.renderSingleLabel("Total (Upper)")}
            {this.renderSingleLabel("Grand Total")}
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
                {this.renderSingleField(0, () => this.calcSumSingleNumber(1))}
                {this.renderSingleField(1, () => this.calcSumSingleNumber(2))}
                {this.renderSingleField(2, () => this.calcSumSingleNumber(3))}
                {this.renderSingleField(3, () => this.calcSumSingleNumber(4))}
                {this.renderSingleField(4, () => this.calcSumSingleNumber(5))}
                {this.renderSingleField(5, () => this.calcSumSingleNumber(6))}
                {this.renderSingleField(6, () => this.calcUpperTotalNoBonus(), true)}
                {this.renderSingleField(7, () => this.calcBonus(), true)}
                {this.renderSingleField(8, () => this.calcUpperBonus(), true)}
                {this.renderSingleField(9, () => this.calcSumForXOfAKind(3))}
                {this.renderSingleField(10, () => this.calcSumForXOfAKind(4))}
                {this.renderSingleField(11, () => this.calcFullHouse())}
                {this.renderSingleField(12, () => this.calcStraight())}
                {this.renderSingleField(13, () => this.calcStraight(true))}
                {this.renderSingleField(14, () => this.calcYahtzee())}
                {this.renderSingleField(15, () => this.utilDiceSum(this.props.diceValues))}
                {this.renderSingleField(16, () => this.calcLower(), true)}
                {this.renderSingleField(17, () => this.calcUpperBonus(), true)}
                {this.renderSingleField(18, () => this.calcGrandTotal(), true)}
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
        this.lockField(16)
        this.lockField(17)
        this.lockField(18)
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

    calcSumSingleNumber(fieldNumber: number): number {
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

    calcLower(): number {
        return this.state.fieldValues
            .slice(9, 16)
            .reduce((total, current) => total + current, 0)
    }

    calcGrandTotal(): number {
        return this.calcUpperBonus() + this.calcLower()
    }

    calcSumForXOfAKind(x: number): number {
        if (this.utilHasAtLeastXOfAKind(this.props.diceValues, x)) {
            return this.utilDiceSum(this.props.diceValues)
        }
        return 0
    }

    calcFullHouse(): number {
        if ((this.utilHasExactXOfAKind(this.props.diceValues, 3) && this.utilHasExactXOfAKind(this.props.diceValues, 2))
            || this.utilHasExactXOfAKind(this.props.diceValues, 5)) {
            return 25
        }

        return 0
    }

    calcStraight(largeStraight: boolean = false): number {
        const faceValues = Array.from({length: 6}, (x, i) => i + 1)
        if (largeStraight) {
            const largeStraights = faceValues.slice(0, 2).map((value, index) => {
                return (this.props.diceValues.includes(faceValues[index])
                    && this.props.diceValues.includes(faceValues[index + 1])
                    && this.props.diceValues.includes(faceValues[index + 2])
                    && this.props.diceValues.includes(faceValues[index + 3])
                    && this.props.diceValues.includes(faceValues[index + 4])
                )
            })
            return largeStraights.includes(true) ? 40 : 0;
        } else {
            const smallStraights = faceValues.slice(0, 3).map((value, index) => {
                return (this.props.diceValues.includes(faceValues[index])
                    && this.props.diceValues.includes(faceValues[index + 1])
                    && this.props.diceValues.includes(faceValues[index + 2])
                    && this.props.diceValues.includes(faceValues[index + 3])
                )
            })
            return smallStraights.includes(true) ? 30 : 0;
        }
    }

    calcYahtzee(): number {
        if (this.utilHasExactXOfAKind(this.props.diceValues, 5)) {
            return 50
        }
        return 0
    }


    // TODO: move to utils.ts
    utilDiceSum(diceValues: Array<number>): number {
        return diceValues.reduce((total, current) => total + current, 0)
    }

    utilHasAtLeastXOfAKind(diceValues: Array<number>, x: number): boolean {
        return Object.values(this.utilGetOccurrences(diceValues))
            .filter((value) => value >= x)
            .length > 0
    }

    utilHasExactXOfAKind(diceValues: Array<number>, x: number): boolean {
        return Object.values(this.utilGetOccurrences(diceValues))
            .filter((value) => value === x)
            .length > 0
    }

    utilGetOccurrences(diceValues: Array<number>): { [key: number]: number } {
        return diceValues.reduce((total: { [key: number]: number }, current) => {
            total[current] ? total[current]++ : total[current] = 1
            return total
        }, {})
    }
}

export default Board