import React, { Component } from "react";
import "../App.css";
import "./site.css";
import "bootstrap";

class DeleteCarConfirm extends Component {
  state = {
    oneCar: this.props.oneCar,
    deleteConfirmed: false
  };
  render() {
    const { id, modelName, brand, color, productionYear } = this.state.oneCar;

    const { onDeleteConfirm, onReturn } = this.props;
    return (
      <React.Fragment>
        <div className="App marginBottom30">
          <h3 className="errorMessage">
            Are you sure you want to remove {modelName}?
          </h3>
          <p className="errorMessage">
            <strong>
              This action can <ins>NOT</ins> be reverted.
            </strong>
          </p>
          <div>
            <button
              onClick={() => onDeleteConfirm(id)}
              className="btn btn-danger btn-sm marginBottom5"
            >
              Remove
            </button>
          </div>
          <div>
            <button className="btn btn-primary btn-sm" onClick={onReturn}>
              Return
            </button>
          </div>
        </div>
        <table className="table-active table-striped AlignCenter marginBottom30 col-4">
          <thead>
            <tr className="col-6">
              <th>model</th>
              <th>brand</th>
              <th>color</th>
              <th>productionYear</th>
            </tr>
          </thead>
          <tbody>
            <tr className=" col-6">
              <td>{modelName}</td>
              <td>{brand}</td>
              <td>{color}</td>
              <td>{productionYear}</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default DeleteCarConfirm;
