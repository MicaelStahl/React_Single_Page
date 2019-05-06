import React, { Component } from 'react';
//import axios from 'axios';

const axios = require('axios');

export default class Cars extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/CarAPI')
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
