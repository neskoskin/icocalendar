import React, { Component } from 'react';

import Ico from '../../components/Ico/Ico';
import './Calendar.css';
import logo from '../../logo.svg';

class Calendar extends Component {
    state = {
        icos: [],
        error: false,
        response: '',
        loading: true
    }
    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({ icos: res, loading: false });
            })
            .catch(err => console.log(err));
    }
    callApi = async () => {
        const response = await fetch('/api/calendar');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        // Set the content to loading state until the data is fetched and ready to be rendered
        let content = this.state.loading ? 
        <div><img src={logo} className="App-logo" alt="logo" /></div>  :
        <table className="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col">Website</th>
                    <th scope="col">Symbol</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            {this.state.icos.map((row, index) => {
                return <Ico row={row} key={index} />
            })}
        </table>;
        return (
            content
        );
    }
}

export default Calendar;