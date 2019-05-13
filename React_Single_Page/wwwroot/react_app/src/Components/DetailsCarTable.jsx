import React from "react";
import "./site.css";

const DetailsCarTable = props => {
  const { oneCar, onEdit, onDelete, onReturn } = props;

  return (
    <div className="container col-8">
      <h1 className="AlignCenter">Details of {oneCar.modelName}</h1>
      <hr />
      <table className="AlignCenter marginBottom60 col-8 table-active">
        <tr className="col-12">
          <th>Model</th>
          <th>Brand</th>
          <th>Color</th>
          <th>ProductionYear</th>
          <th>Options</th>
        </tr>
        <tr className="col-12" key={oneCar.id}>
          <td>{oneCar.modelName}</td>
          <td>{oneCar.brand}</td>
          <td>{oneCar.color}</td>
          <td>{oneCar.productionYear}</td>
          <td>
            <button
              onClick={() => onEdit(oneCar)}
              className="btn btn-warning btn-sm m-1"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(oneCar.id)}
              className="btn btn-danger btn-sm m-1"
            >
              Delete
            </button>
          </td>
        </tr>
      </table>
      <hr />
      <button
        onClick={() => onReturn()}
        className="btn btn-primary btn-sm offset-2"
      >
        Return
      </button>
    </div>
  );
};

export default DetailsCarTable;
