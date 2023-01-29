import React, {Component} from "react";
import Field from "./Field";
import './Board.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface IProps {
}

interface IState {
}

class Board extends Component<IProps, IState> {
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

    renderFields() {
        return (
            <table>
                <tbody>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
                <Field/>
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

}

export default Board