import React, { Component } from 'react';

import { Collapse } from 'react-bootstrap';
import './Ico.css';

class Ico extends Component {

    constructor(props) {
        super(props);
        this.state = { detailed: false };
        this.toggle = this.toggle.bind(this);
    }
    // Toggle the full details
    toggle() {
        this.setState({ detailed: !this.state.detailed });
    }
    render() {
        return (
            <tbody>
                <tr key={this.props.row.index}>
                    <td><img src={`/assets/icons/${this.props.row.imageSrc}`} alt="Info icon" /></td>
                    <td>
                        <div className="name">
                            {this.props.row.name}
                        </div>
                        <br />
                        <div className="shortDescription">
                            {this.props.row.shortDescription}
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="date">{this.props.row.startDate}</div>
                    </td>
                    <td className="text-center">
                        <div className="date">{this.props.row.endDate}</div>
                    </td>
                    <td className="text-center">
                        <a className="website" target="_blank" href={this.props.row.website}>website</a>
                    </td>
                    <td className="text-center">{this.props.row.tokenSymbol}</td>
                    <td>
                        <img className="btn-link" onClick={this.toggle}
                            id="info" src="info.png" alt="Info icon" />
                    </td>
                </tr>
                <Collapse in={this.state.detailed}>
                    <tr>
                        <td colSpan={7}>{this.props.row.fullDescription}</td>
                    </tr>
                </Collapse>
            </tbody>
        )
    }
}
export default Ico;