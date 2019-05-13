import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import AllCars from "./AllCars";
import "./Components/site.css";
import CreateCarForm from "./Components/CreateCarForm";
import DetailsCarTable from "./Components/DetailsCarTable";
import EditCarForm from "./Components/EditCarForm";
import SortCarTable from "./Components/SortCarTable";

const url = "http://localhost:50291/api/CarAPI/";

class App extends Component {
  state = {
    cars: [],
    createCar: false,
    detailsCar: false,
    editCar: false,
    deleteCar: false,
    sortCars: "",
    oneCar: [],
    brands: [],
    brand: ""
  };

  //This one should be it's own individual button.
  handleCreate = () => {
    console.log("handleCreate called");

    this.setState({ createCar: true });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
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

    this.setState({ oneCar: car, editCar: true, detailsCar: false });
  };

  // If I want to make a "failsafe" for delete,
  // then make this into a different page instead.
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

  handleSort = event => {
    console.log(event);
    console.log("handleSort called");

    this.setState({ sortCars: [event] });
  };

  handleReturn = () => {
    axios.get(url, { "Content-Type": "application/json" }).then(response => {
      this.setState({
        cars: response.data,
        createCar: false,
        detailsCar: false,
        editCar: false,
        deleteCar: false,
        oneCar: [],
        brands: [],
        brand: "",
        sortCars: ""
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
    const {
      cars,
      brands,
      createCar,
      oneCar,
      detailsCar,
      editCar,
      sortCars
    } = this.state;

    if (cars.length > 0) {
      if (createCar === true) {
        return (
          <CreateCarForm
            onChange={this.handleChange}
            onCreate={this.handleCreateComplete}
            onReturn={this.handleReturn}
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
            onCreate={this.handleCreateComplete}
            onReturn={this.handleReturn}
          />
        );
      }
      if (sortCars !== "") {
        return (
          <div className="App">
            <h1>Hello!</h1>
            <SortCarTable
              cars={cars}
              onEdit={this.handleEdit}
              onDetails={this.handleDetails}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortCars={sortCars}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={this.handleCreate}
            >
              Create Car
            </button>
          </div>
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
            onSort={this.handleSort}
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
