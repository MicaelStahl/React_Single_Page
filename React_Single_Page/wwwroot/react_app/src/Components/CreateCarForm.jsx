import React from "react";
import "./site.css";
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from "constants";

const CreateCarForm = props => {
  //   const year = new Date().getFullYear();
  // If I want to use the line above, then I have to include a handleChange method.
  const { brands, onCreate, onChange, onReturn } = props;

  if (brands.length > 0) {
    return (
      <div className="container col-2 AlignCenter">
        <hr />
        <form className="marginBottom60" onSubmit={onCreate}>
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
          <label>Color</label>
          <br />
          <input name="color" type="text" placeholder="Car-color" required />
          <hr />
          <label>ProductionYear</label>
          <br />
          <input
            name="productionYear"
            type="datetime"
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
        <button
          onClick={() => onReturn()}
          className="btn btn-primary btn-sm offset-2"
        >
          Return
        </button>
      </div>
    );
  } else {
    return (
      <div className="container AlignCenter">
        <p className="errorMessage">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }
};

export default CreateCarForm;
