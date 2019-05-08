import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AllCars from './AllCars';

const url = 'http://localhost:50291/api/CarAPI';

class App extends Component {

    state = {
        cars: []
    };

    //This one should be it's own individual button.
    handleCreate = () => {
        console.log('handleCreate called');
    }

    handleRead = () => {
        console.log('handleRead called');
    }

    handleUpdate = () => {
        console.log('handleUpdate called');
    }

    handleDelete = (id) => {
        axios.delete('http://localhost:50291/api/CarAPI/' + id)
            .then(response => {
                const cars = this.state.cars.filter(x => x.id !== id);
                this.setState({ cars })
            })
            .catch(error => {
                console.log(error);
                return <p>Something went wrong. Please try again.</p>
            })
    }

    componentDidMount() {

        axios.get(url, { 'Content-Type': 'application/json' })
            .then(response => {

                this.setState({ cars: response.data });
            })
            .catch(status => {
                console.log(status);
            })

    }

    render() {


        if (this.state.cars.length > 0) {

            const { cars } = this.state;

            return (
                <div className="App">
                    <h1>Hello :)</h1>
                    <AllCars
                        carData={cars}
                        onUpdate={this.handleUpdate}
                        onRead={this.handleRead}
                        onDelete={this.handleDelete}
                    />
                </div>
            );
        }
        else {
            return <div>
                <h1>Hello, The list is empty.</h1>
            </div>
        }
    }
}

export default App;