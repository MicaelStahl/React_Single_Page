import React from "react";
import "./site.css";

const DetailsCarTable = props => {
  const { oneCar, onEdit, onDelete, detailsStyling } = props;
  const { marginBottom, center, float } = detailsStyling;
  // This is basically just a class filled with CSS attributes :)
  let style = marginBottom + " " + center + " " + float + " table-active";
  return (
    <table className={style}>
      <thead>
        <tr className="col-12">
          <th>Model</th>
          <th>Brand</th>
          <th>Color</th>
          <th>ProductionYear</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
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
      </tbody>
    </table>
  );
};

export default DetailsCarTable;
