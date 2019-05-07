import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AllCars from './AllCars';

const url = 'http://localhost:50291/api/CarAPI';

class App extends Component {

    state = {
        data: [],
    }

    componentDidMount() {

        axios.get(url, { 'Content-Type': 'application/json' })
            .then(response => {

                console.log(response)

                this.setState({ data: response });
            })
            .catch(status => {
                console.log(status);
            })
    }

    render() {

        const { carData } = this.state.data;
        console.log(carData);

        return (
            <div className="App">
                <h1>Hello :)</h1>
                <AllCars carData={carData} />
            </div>
        );
    }
}

export default App;