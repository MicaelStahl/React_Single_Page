import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import AllCars from "./AllCars";
import "./Components/site.css";
import "react-bootstrap";
import $ from "jquery";
import CreateCarForm from "./Components/CreateCarForm";
import DetailsCarTable from "./Components/DetailsCarTable";
import EditCarForm from "./Components/EditCarForm";
import SortCarTable from "./Components/SortCarTable";
import DeleteCarConfirm from "./Components/DeleteCarConfirm";

const url = "http://localhost:50291/api/CarAPI/";

class App extends Component {
  state = {
    cars: [],
    screenWidth: null,
    createCar: false,
    detailsCar: false,
    editCar: false,
    deleteCar: false,
    ascending: true,
    descending: false,
    errorMsg: "",
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
    console.log(this.state.brand);
    if (this.state.brand === "" || this.state.brand === undefined) {
      let { errorMsg } = this.state;
      this.setState({ errorMsg: "You need to pick a brand for the car." });
      return errorMsg;
    } else {
      const car = {
        ModelName: target.modelName.value,
        Brand: this.state.brand,
        Color: target.color.value,
        ProductionYear: target.productionYear.value
      };

      // In the future maybe returning 1 car and then using push to main list
      // Would be more efficient instead of returning the entire list?
      axios
        .post(url, car)
        .then(response => {
          this.setState({ cars: response.data, createCar: false });
        })
        .catch(status => {
          alert(status);
        });
    }
  };

  handleDetails = car => {
    console.log("handleDetails called");
    this.setState({
      oneCar: car,
      detailsCar: true
    });
  };

  handleEdit = car => {
    console.log("handleEdit called");

    this.setState({ oneCar: car, editCar: true, detailsCar: false });
  };

  handleDelete = car => {
    console.log("handleDelete called");

    this.setState({ deleteCar: true, oneCar: car });
  };

  // If I want to make a "failsafe" for delete,
  // then make this into a different page instead.
  handleDeleteConfirm = id => {
    console.log("handleDeleteConfirm called");
    axios
      .delete(url + id)
      .then(response => {
        console.log(response);
        let detailsCar = this.state;
        detailsCar = false;

        const cars = this.state.cars.filter(x => x.id !== id);
        this.setState({ cars, detailsCar, oneCar: "", deleteCar: false });
      })
      .catch(error => {
        console.log(error);
        return <p>Something went wrong. Please try again.</p>;
      });
  };

  handleSort = event => {
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
        ascending: true,
        descending: false,
        deleteCar: false,
        errorMsg: "",
        oneCar: [],
        brand: "",
        sortCars: ""
      });
    });
  };

  updateWindowsDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  // Checks the width of the page before loading.
  componentWillMount() {
    this.updateWindowsDimensions();
  }

  // Fetches the cars and brands from backend if the page loaded correctly
  // Also checks the width of the screen via a EventListener.
  componentDidMount() {
    $("#createCar").on("click", this.handleCreate);
    axios
      .get(url, { "Content-Type": "application/json" })
      .then(response => {
        this.setState({ cars: response.data });
      })
      .catch(status => {
        console.log(status);
      });
    axios
      .get("http://localhost:50291/api/CarAPI/GetBrands")
      .then(response => {
        this.setState({ brands: response.data });
      })
      .catch(status => {
        console.log(status);
      });
    window.addEventListener("resize", this.updateWindowsDimensions);
  }

  // This removes the EventListener that checks the screensize.
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowsDimensions);
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
      errorMsg,
      deleteCar
    } = this.state;

    let { screenWidth } = this.state;

    let allCarsStyling = {
      center: "AlignCenter",
      marginBottom: "marginBottom60"
    };
    let detailsStyling = {
      center: "AlignCenter",
      marginBottom: "marginBottom60"
    };

    if (cars.length > 0) {
      if (createCar === true) {
        return (
          <CreateCarForm
            onChange={this.handleBrand}
            onCreate={this.handleCreateComplete}
            onReturn={this.handleReturn}
            errorMsg={errorMsg}
            brands={brands}
          />
        );
      }
      if (detailsCar === true) {
        if (screenWidth > 1100) {
          allCarsStyling = {
            AlignCenter: "",
            marginBottom: "marginBottom60"
          };

          const detailsStyling = {
            AlignCenter: "",
            marginBottom: "marginBottom60"
          };

          return (
            <div className="container">
              <div className="row resetRow">
                <div className="col-6">
                  <h1 className="marginBottom30">All Cars!</h1>

                  <AllCars
                    allCarsStyling={allCarsStyling}
                    carData={cars}
                    onEdit={this.handleEdit}
                    onDetails={this.handleDetails}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}
                  />
                </div>
                <div className="offset-1 col-5">
                  <h1 className="marginBottom30">
                    Details of {oneCar.modelName}
                  </h1>
                  <DetailsCarTable
                    detailsStyling={detailsStyling}
                    oneCar={oneCar}
                    onEdit={this.handleEdit}
                    onDelete={this.handleDelete}
                    onReturn={this.handleReturn}
                  />
                </div>
                <div className="AlignCenter clearFloats">
                  <button
                    className="btn btn-primary btn-sm marginBottom5"
                    onClick={this.handleCreate}
                  >
                    Create Car
                  </button>
                  <button
                    className="btn btn-primary btn-sm offset-1"
                    onClick={this.handleReturn}
                  >
                    Return
                  </button>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="App">
            <h1>Details of {oneCar.modelName}</h1>
            <hr className="col-6" />
            <DetailsCarTable
              detailsStyling={detailsStyling}
              oneCar={oneCar}
              onEdit={this.handleEdit}
              onDelete={this.handleDelete}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={this.handleReturn}
            >
              Return
            </button>
          </div>
        );
      }
      if (editCar === true) {
        return (
          <div>
            <EditCarForm
              oneCar={oneCar}
              brands={brands}
              onCreate={this.handleCreateComplete}
              onReturn={this.handleReturn}
            />
          </div>
        );
      }

      if (deleteCar === true) {
        return (
          <div classname="App">
            <DeleteCarConfirm
              oneCar={oneCar}
              onReturn={this.handleReturn}
              onDeleteConfirm={this.handleDeleteConfirm}
            />
          </div>
        );
      }

      if (sortCars !== "") {
        return (
          <div className="App">
            <h1>Sorted by {sortCars}!</h1>
            <SortCarTable
              cars={cars}
              onEdit={this.handleEdit}
              onDetails={this.handleDetails}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortCars={sortCars}
              descending={descending}
            />
            <button
              className="btn btn-primary btn-sm marginBottom5"
              onClick={this.handleCreate}
            >
              Create Car
            </button>
            <div>
              <button
                className="btn btn-primary btn-sm "
                onClick={this.handleReturn}
              >
                Reset Sort
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="App">
          <h1>All Cars!</h1>
          <AllCars
            allCarsStyling={allCarsStyling}
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
