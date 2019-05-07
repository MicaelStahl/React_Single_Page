import React, { Component } from 'react';
import axios from 'axios';

const url = 'http://127.0.0.1/api/CarAPI/';
const testUrl = 'http://localhost:50291/api/CarAPI';


export default class Cars extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        fetch(url)
            .then(response => {
                console.log(response);
                this.setState({ data: response });
            })


        axios.get(testUrl)
            .then(response => {
                console.log(response);
                this.setState({ data: response });
            })
        axios.get(url, { responseType: 'text' })
            .then(response => {
                console.log(response);
                this.setState({ data: response });
            })

        //axios.get("/api/carapi")
        //    .then(response => {
        //        console.log(response);
        //        this.setState({ data: response.data });
        //    })
    }

    render() {
        return (
            <p>Because its dumb and doesn't wanna work</p>
        );
    }
}
