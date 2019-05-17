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
    successMsg: "",
    errorMsg: "",
    sortCars: "",
    oneCar: [],
    brands: [],
    brandList: [],
    brand: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log("handleChange called");

    this.setState({ [name]: value });
  };

  // This one is specifically for brand while creating / Editing.
  handleBrand = event => {
    const { value } = event.target;
    console.log("handleBrand called");

    this.setState({ brand: value });
  };

  // First part of Create. Enables createCar so the form can be seen.
  handleCreate = () => {
    console.log("handleCreate called");

    this.setState({ createCar: true });
  };

  // This is the "post" version of Create.
  // Also disables createCar so the form cannot be seen anymore.
  handleCreateComplete = event => {
    event.preventDefault();

    console.log("handleCreateComplete called");

    const target = event.target;

    // Checks if the user forgot to choose a brand.
    if (
      this.state.brand === "" ||
      this.state.brand === undefined ||
      this.state.brand === "Select one"
    ) {
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

      axios
        .post(url, car)
        .then(response => {
          const car = response.data;
          const carList = this.state.cars;

          carList.push(car);

          this.setState({
            cars: carList,
            createCar: false,
            successMsg: "Your car was successfully created! Hurray!"
          });
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
      detailsCar: true,
      successMsg: "Your car was successfully viewed!"
    });
  };

  handleEdit = car => {
    axios
      .get("http://localhost:50291/api/CarAPI/GetBrands")
      .then(response => {
        this.setState({ brands: response.data });
      })
      .catch(status => {
        console.log(status);
      });

    console.log("handleEdit called");

    const { brands } = this.state;

    let splicedBrands = brands;

    let index = splicedBrands.indexOf(car.brand);

    splicedBrands.splice(index, 1);

    this.setState({
      oneCar: car,
      brand: car.brand,
      brandList: splicedBrands,
      editCar: true,
      detailsCar: false,
      successMsg: "Your car was successfully edited! Hurray!"
    });
  };

  handleEditSubmit = event => {
    event.preventDefault();
    console.log("handleEditSubmit called");
    const { modelName, brand, color, productionYear } = event.target;
    const { oneCar, cars, brands } = this.state;
    const id = event.target.id.value;

    const car = {
      ModelName: modelName.value,
      Brand: this.state.brand === undefined ? brand : oneCar.brand,
      Color: color.value,
      ProductionYear: productionYear.value
    };

    axios.put(url + id, car).then(response => {
      if (response.data !== null || response.data.length !== 0) {
        const index = cars.findIndex(x => x.id === response.data.id);

        const carList = this.state.cars;

        carList.splice(index, 1, response.data);

        this.setState({
          cars: carList,
          brands: brands,
          editCar: false,
          successMsg: "Your car was successfully updated!"
        });
      }
    });
  };

  handleDelete = car => {
    console.log("handleDelete called");

    this.setState({ deleteCar: true, oneCar: car });
  };

  handleDeleteConfirm = id => {
    console.log("handleDeleteConfirm called");
    axios
      .delete(url + id)
      .then(response => {
        let detailsCar = this.state;
        detailsCar = false;

        const cars = this.state.cars.filter(x => x.id !== id);
        this.setState({
          cars,
          detailsCar,
          oneCar: "",
          deleteCar: false,
          successMsg: "Your car was successfully deleted. *sniff*"
        });
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
        successMsg: "",
        errorMsg: "",
        oneCar: [],
        brand: "",
        sortCars: ""
      });
    });
    axios
      .get("http://localhost:50291/api/CarAPI/GetBrands")
      .then(response => {
        this.setState({ brands: response.data });
      })
      .catch(status => {
        console.log(status);
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
    $("#funny-llama").on("click", this.handleReturn);
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
      brandList,
      createCar,
      oneCar,
      detailsCar,
      editCar,
      descending,
      sortCars,
      successMsg,
      errorMsg,
      deleteCar,
      brand
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
                <div className="col-7">
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
                <div className="col-5">
                  <h1 className="marginBottom30">
                    Details of {oneCar.modelName}
                  </h1>
                  {successMsg === "" ? null : (
                    <h3 className="successMsgGray marginBottom30">
                      {successMsg}
                    </h3>
                  )}
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
              currentBrand={brand}
              brands={brandList}
              onEditSubmit={this.handleEditSubmit}
              onEditBrand={this.handleBrand}
              onReturn={this.handleReturn}
            />
          </div>
        );
      }

      if (deleteCar === true) {
        return (
          <div className="App">
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
          {successMsg === "" ? null : (
            <h3 className="successMsgGray">{successMsg}</h3>
          )}
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
