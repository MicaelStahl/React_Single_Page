import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import AllCars from "./AllCars";
import "./Components/site.css";
import CreateCarForm from "./Components/CreateCarForm";
import DetailsCarTable from "./Components/DetailsCarTable";
import EditCarForm from "./Components/EditCarForm";

const url = "http://localhost:50291/api/CarAPI/";

class App extends Component {
    state = {
        cars: [],
        createCar: false,
        detailsCar: false,
        editCar: false,
        deleteCar: false,
        oneCar: [],
        brands: [],
        brand: ""
    };

    //This one should be it's own individual button.
    handleCreate = () => {
        console.log("handleCreate called");

        console.log(this.state.createCar);

        let createCar = this.state;

        createCar = true;

        this.setState({ createCar });
        console.log(this.state.createCar);
    };

    handleChange = event => {
        this.setState({ brand: event.target.value });
    };

    // This is the "post" version of Create.
    handleCreateComplete = event => {
        event.preventDefault();
        const target = event.target;

        const car = {
            ModelName: target.modelName.value,
            Brand: this.state.brand,
            Color: target.color.value,
            ProductionYear: target.productionYear.value
        };

        console.log(car);

        axios
            .post(url, car)
            .then(response => {
                console.log(response);
                this.setState({ cars: response.data, createCar: false });
            })
            .catch(status => {
                alert(status);
            });
    };

    handleDetails = car => {
        console.log("handleDetails called");
        this.setState({ oneCar: car, detailsCar: true });
    };

    handleEdit = car => {
        console.log("handleEdit called");

        let editCar = this.state

        editCar = true

        console.log(car);
        this.setState({ oneCar: car, editCar });
    };

    handleDelete = id => {
        axios
            .delete(url + id)
            .then(response => {
                let detailsCar = this.state;
                detailsCar = false;

                const cars = this.state.cars.filter(x => x.id !== id);
                this.setState({ cars, detailsCar });
            })
            .catch(error => {
                console.log(error);
                return <p>Something went wrong. Please try again.</p>;
            });
    };

    handleReturn = () => {
        axios.get(url, { "Content-Type": "application/json" }).then(response => {
            this.setState({
                cars: response.data,
                createCar: false,
                detailsCar: false,
                editCar: false,
                deleteCar: false,
                oneCar: []
            });
        });
    };

    componentDidMount() {
        axios
            .get(url, { "Content-Type": "application/json" })
            .then(response => {
                this.setState({ cars: response.data });
            })
            .catch(status => {
                console.log(status);
            });
        axios.get("http://localhost:50291/api/CarAPI/GetBrands").then(response => {
            this.setState({ brands: response.data });
        });
    }

    render() {
        const { cars, brands, createCar, oneCar, detailsCar, editCar } = this.state;

        if (cars.length > 0) {
            if (createCar === true) {
                return (
                    <CreateCarForm
                        onChange={this.handleChange}
                        onCreate={this.handleCreateComplete}
                        brands={brands}
                    />
                );
            }
            if (detailsCar === true) {
                return (
                    <DetailsCarTable
                        oneCar={oneCar}
                        onEdit={this.handleEdit}
                        onDelete={this.handleDelete}
                        onReturn={this.handleReturn}
                    />
                );
            }
            if (editCar === true) {
                return (
                    <EditCarForm
                        oneCar={oneCar}
                        brands={brands}
                        onChange={this.handleChange}
                        onCreate={this.handleCreateComplete}
                        onReturn={this.handleReturn}
                    />
                );
            }

            return (
                <div className="App">
                    <h1>Hello!</h1>
                    <AllCars
                        carData={cars}
                        onEdit={this.handleEdit}
                        onDetails={this.handleDetails}
                        onDelete={this.handleDelete}
                    />
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={this.handleCreate}
                    >
                        Create Car
          </button>
                </div>
            );
        } else {
            return (
                <div className="container App errorMessage">
                    <h2>
                        Something went wrong when trying to reach the server. Try again
                        later.
          </h2>
                </div>
            );
        }
    }
}

export default App;
