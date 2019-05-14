import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import AllCars from "./AllCars";
import "./Components/site.css";
import CreateCarForm from "./Components/CreateCarForm";
import DetailsCarTable from "./Components/DetailsCarTable";
import EditCarForm from "./Components/EditCarForm";
import SortCarTable from "./Components/SortCarTable";
import DeleteCarConfirm from "./Components/DeleteCarConfirm";

const url = "http://localhost:50291/api/CarAPI/";

class App extends Component {
  state = {
    cars: [],
    createCar: false,
    detailsCar: false,
    editCar: false,
    deleteCar: false,
    ascending: true,
    descending: false,
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
    console.log("handleChange called");

    this.setState({ [name]: value });
  };

  // This one is specifically for brand while creating.
  // Can't get it to work with handleChange. :(
  handleBrand = event => {
    const { value } = event.target;
    console.log("handleBrand called");

    this.setState({ brand: value });
  };

  // This is the "post" version of Create.
  handleCreateComplete = event => {
    event.preventDefault();
    console.log("handleCreateComplete called");
    const target = event.target;

    const car = {
      ModelName: target.modelName.value,
      Brand: this.state.brand,
      Color: target.color.value,
      ProductionYear: target.productionYear.value
    };

    axios
      .post(url, car)
      .then(response => {
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

  handleDelete = () => {
    console.log("handleDelete called");

    this.setState({ deleteCar: true });
  };

  // If I want to make a "failsafe" for delete,
  // then make this into a different page instead.
  handleDeleteConfirm = id => {
    console.log("handleDeleteConfirm called");
    axios
      .delete(url + id)
      .then(response => {
        let detailsCar = this.state;
        detailsCar = false;

        const cars = this.state.cars.filter(x => x.id !== id);
        this.setState({ cars, detailsCar, deleteCar: false });
      })
      .catch(error => {
        console.log(error);
        return <p>Something went wrong. Please try again.</p>;
      });
  };

  handleSort = event => {
    console.log("handleSort called");
    // let { ascending, descending } = this.state;

    // if (ascending === true) {
    //   this.setState({ ascending: false, descending: false });
    // } else if (ascending === false) {
    //   this.setState({ ascending: true, descending: true });
    // }
    // console.log(ascending + " + " + descending);
    this.setState({ sortCars: [event] });
  };

  handleReturn = () => {
    axios.get(url, { "Content-Type": "application/json" }).then(response => {
      this.setState({
        cars: response.data,
        createCar: false,
        detailsCar: false,
        editCar: false,
        ascending: true,
        descending: false,
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
      descending,
      sortCars,
      deleteCar
    } = this.state;

    if (cars.length > 0) {
      if (createCar === true) {
        return (
          <CreateCarForm
            onChange={this.handleBrand}
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
            onDelete={this.handleDeleteConfirm}
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

      if (deleteCar === true) {
        return (
          <div classname="App">
            <DeleteCarConfirm
              oneCar={oneCar}
              onReturn={onReturn}
              handleDeleteConfirm={this.handleDeleteConfirm}
            />
          </div>
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
              onDelete={this.handleDeleteConfirm}
              onSort={this.handleSort}
              sortCars={sortCars}
              descending={descending}
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
            onDelete={this.handleDeleteConfirm}
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
