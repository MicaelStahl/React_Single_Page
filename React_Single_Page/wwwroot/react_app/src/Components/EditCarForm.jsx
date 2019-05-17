import React, { Component } from "react";

class EditCarForm extends Component {
  constructor(props) {
    super(props);

    const { oneCar, brands } = this.props;
    const { id, modelName, brand, color, productionYear } = oneCar;

    this.state = {
      oneCar: oneCar,
      brands: brands,
      brandList: [],
      id: id,
      modelName: modelName,
      brand: brand,
      color: color,
      productionYear: productionYear
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

  render() {
    const { onReturn, onEditSubmit, onEditBrand } = this.props;

    const { id, modelName, color, brand, productionYear, brands } = this.state;

    return (
      <div className="container col-3 AlignCenter">
        <h1>Edit {modelName}</h1>
        <form className="marginBottom30" onSubmit={onEditSubmit}>
          <input type="hidden" name="id" value={id} />
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
          <hr className="col-6" />
          <label>Brand</label>
          <br />
          <select onChange={onEditBrand}>
            <option name="brand" value={brand}>
              {brand}
            </option>
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
