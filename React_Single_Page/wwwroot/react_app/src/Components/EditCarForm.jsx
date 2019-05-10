import React, { Component } from "react";

class EditCarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneCar: this.props.oneCar,
      modelName: "",
      brand: "",
      color: "",
      productionYear: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };
  //Continue here.
  render() {
    const { oneCar, brands, onChange, onCreate, onReturn } = this.props;
    const { modelName, color, brand, productionYear } = oneCar;
    return (
      <div className="container col-2 AlignCenter">
        <hr />
        <form onSubmit={onCreate}>
          <label>Model</label>
          <br />
          <input
            name="modelName"
            type="text"
            onChange={this.handleChange}
            value={modelName}
            placeholder="Car-model"
            required
          />
          <hr />
          <label>Brand</label>
          <br />
          <select onChange={onChange}>
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
            value={color}
            onChange={this.handleChange}
            type="text"
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
