import React, { Component } from "react";
import axios from "axios";
import App from "../App";

const url = "http://localhost:50291/api/CarAPI/";

class EditCarForm extends Component {
  constructor(props) {
    super(props);

    const { oneCar } = this.props;

    this.state = {
      oneCar: oneCar,
      editComplete: false,

      modelName: oneCar.modelName,
      brand: oneCar.brand,
      color: oneCar.color,
      productionYear: oneCar.productionYear
    };
  }

  // This method takes the new character written in real time and
  // Updates the relevant state-child.
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("handleSubmit - EditCarForm called");

    const { modelName, brand, color, productionYear, oneCar } = this.state;

    const car = {
      ModelName: modelName,
      Brand: brand,
      Color: color,
      ProductionYear: productionYear
    };
    console.log(car);
    axios
      .put(url + oneCar.id, car, { "Content-Type": "application/json" })
      .then(response => {
        this.setState({ editComplete: true });
      })
      .catch(error => {
        if (error.response) {
          console.log(
            "There was an error reaching the server. Please try again."
          );
        } else if (error.request) {
          console.log("The request was invalid. Please try again.");
        } else {
          console.log("Something went wrong - " + error);
        }
      });
  };

  //Continue here.
  render() {
    const { brands, onReturn } = this.props;
    const {
      modelName,
      color,
      brand,
      productionYear,
      editComplete
    } = this.state;

    if (editComplete === true) {
      return <App />;
    }

    console.log(modelName);

    return (
      <div className="container col-2 AlignCenter">
        <hr />
        <form className="marginBottom60" onSubmit={this.handleSubmit}>
          <label>Model</label>
          <br />
          <input
            name="modelName"
            type="text"
            value={modelName}
            onChange={this.handleChange}
            placeholder="Car-model"
            required
          />
          <hr />
          <label>Brand</label>
          <br />
          <select onChange={this.handleChange}>
            <option value={brand}>{brand}</option>
            {brands.map((brand, index) => (
              <option name="brand" key={index}>
                {brand}
              </option>
            ))}
          </select>
          <hr />
          <label>Color</label>
          <br />
          <input
            name="color"
            type="text"
            value={color}
            onChange={this.handleChange}
            placeholder="Car-color"
            required
          />
          <hr />
          <label>ProductionYear</label>
          <br />
          <input
            name="productionYear"
            type="datetime"
            value={productionYear}
            onChange={this.handleChange}
            placeholder="Production-Year"
            required
          />
          <hr />
          <input
            type="submit"
            value="Submit"
            className="btn btn-success btn-sm"
          />
        </form>
        <button
          onClick={() => onReturn()}
          className="btn btn-primary btn-sm offset-2"
        >
          Return
        </button>
      </div>
    );
  }
}

export default EditCarForm;
