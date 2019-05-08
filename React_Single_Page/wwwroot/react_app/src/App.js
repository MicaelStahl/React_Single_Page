import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AllCars from './AllCars';

const url = 'http://localhost:50291/api/CarAPI';

class App extends Component {

    state = {
        cars: [],
    }

    componentWillMount() {

        console.log('hello');

    axios.get(url, { 'Content-Type': 'application/json' })
        .then(response => {

            console.log(response);

            this.setState({ cars: response.data });
        })
        .catch(status => {
            console.log(status);
        })

}

render() {

    const { carData } = this.state.cars;
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