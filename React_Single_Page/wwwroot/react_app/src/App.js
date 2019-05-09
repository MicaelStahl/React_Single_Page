import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import AllCars from "./AllCars";
import "./Components/site.css";
import CreateCarForm from "./Components/CreateCarForm";

const url = "http://localhost:50291/api/CarAPI";

class App extends Component {
  state = {
    cars: [],
    createCar: false,
    brands: [],
    brand: "",
    carMsg: null
  };

  //This one should be it's own individual button.
  handleCreate = () => {
    console.log("handleCreate called");

    axios.get("http://localhost:50291/api/CarAPI/GetBrands").then(response => {
      console.log(response.data);
      console.log(this.state.createCar);

      let createCar = this.state;

      createCar = true;

      this.setState({ createCar, brands: response.data });
      console.log(this.state.createCar);
    });
  };

  handleChange = event => {
    this.setState({ brand: event.target.value });
  };

  // This is the "post" version of Create.
  handleCreateComplete = event => {
    const cars = this.state.cars;
    event.preventDefault();
    const target = event.target;
    const brand = this.state.brand;

    console.log(target.modelName.value);
    console.log(target.color.value);
    console.log(target.productionYear.value);
    console.log(brand);

    let value = target.modelName.value;
    value += brand;
    value += target.color.value;
    value += target.productionYear.value;

    console.log(value);
    axios
      .post("http://localhost:50291/api/CarAPI", event.target.value)
      .then(response => {
        cars.push(response.Car);
        this.setState({ cars, carMsg: response.Message });
      });
  };

  handleRead = () => {
    console.log("handleRead called");
  };

  handleUpdate = () => {
    console.log("handleUpdate called");
  };

  handleDelete = id => {
    axios
      .delete("http://localhost:50291/api/CarAPI/" + id)
      .then(response => {
        const cars = this.state.cars.filter(x => x.id !== id);
        this.setState({ cars });
      })
      .catch(error => {
        console.log(error);
        return <p>Something went wrong. Please try again.</p>;
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
  }

  render() {
    const { cars, brands, createCar } = this.state;

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

      return (
        <div className="App">
          <h1>Hello :)</h1>
          <AllCars
            carData={cars}
            onUpdate={this.handleUpdate}
            onRead={this.handleRead}
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
        <div>
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
