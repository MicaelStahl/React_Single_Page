import React, { Component } from "react";

const CreateCarForm = props => {
  const year = new Date().getFullYear();

  const { brands, onCreate, onChange } = props;

  return (
    <div className="container offset-2 col-4">
      <hr />
      <form onSubmit={onCreate}>
        <label>Model</label>
        <br />
        <input name="modelName" type="text" placeholder="Car-model" required />
        <hr />
        <label>Brand</label>
        <br />
        <select onChange={onChange}>
          <option value="Select one">Select one</option>
          {brands.map((brand, index) => (
            <option name="brand" key={index}>
              {brand}
            </option>
          ))}
        </select>
        <hr />
        <label />
        <br />
        <input name="color" type="text" placeholder="Car-color" required />
        <hr />
        <label>ProductionYear</label>
        <br />
        <input
          name="productionYear"
          type="DateTime"
          // value={year}
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
    </div>
  );
};

class CreateCarFormTest extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const year = new Date().getFullYear();

    const { brands, onCreate, onChange } = this.props;
    return (
      <div className="container offset-2 col-4">
        <hr />
        <form>
          <label>Model</label>
          <br />
          <input
            name="modelName"
            type="text"
            placeholder="Car-model"
            required
          />
          <hr />
          <label>Brand</label>
          <br />
          <select onChange={onChange}>
            <option value="Select one">Select one</option>
            {brands.map((brand, index) => (
              <option name="brand" key={index}>
                {brand}
              </option>
            ))}
          </select>
          <hr />
          <label />
          <br />
          <input name="color" type="text" placeholder="Car-color" required />
          <hr />
          <label>ProductionYear</label>
          <br />
          <input
            name="productionYear"
            type="DateTime"
            // value={year}
            placeholder="Production-Year"
            required
          />
          <hr />
          <input
            onClick={onCreate}
            type="submit"
            value="Submit"
            className="btn btn-success btn-sm"
          />
        </form>
      </div>
    );
  }
}

export default CreateCarForm;
