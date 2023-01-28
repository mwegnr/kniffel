import React, {Component} from "react";
import './Die.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface IProps {
    value: number;
}

// interface IState {
//     value: string;
// }
const faces = ["one", "two", "three", "four", "five", "six"]

class Die extends Component<IProps> {
    render() {
        return (
            <div>
                {/*<button >*/}
                <FontAwesomeIcon icon={`dice-${faces[this.props.value - 1]}` as IconProp} className='Die'
                                 onClick={() => console.log("Click")}/>
                {/*<p>{this.props.value}</p>*/}
            </div>

        )
    }

    //
    // handleClick() {
    //     const value = Math.ceil(Math.random() * 6)
    //     console.log(value)
    //     this.setState({face: faces[value - 1]})
    // }
}


export default Die