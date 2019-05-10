import React, { Component } from "react";
import "./Components/site.css";

const AllCarsTableList = props => {
  const { carData, onEdit, onDetails, onDelete } = props;

  const rows = carData.map((car, index) => (
    <tr key={car.id} className="col-12">
      <td>{car.modelName}</td>
      <td>{car.brand}</td>
      <td>{car.color}</td>
      <td>{car.productionYear}</td>
      <td>
        <button
          onClick={() => onEdit(car)}
          className="btn btn-warning btn-sm m-1"
        >
          Edit
        </button>
        <button
          onClick={() => onDetails(car)}
          className="btn btn-primary btn-sm m-1"
        >
          Details
        </button>
        <button
          onClick={() => onDelete(car.id)}
          className="btn btn-danger btn-sm m-1"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return <tbody>{rows}</tbody>;
};

const AllCarsTableName = () => {
  return (
    <thead>
      <tr className="col-12">
        <th>Model</th>
        <th>Brand</th>
        <th>Color</th>
        <th>ProductionYear</th>
        <th>Options</th>
      </tr>
    </thead>
  );
};

export default class Cars extends Component {
  render() {
    const { carData, onEdit, onDetails, onDelete } = this.props;

    return (
      <table className="marginBottom60 AlignCenter">
        <AllCarsTableName />
        <AllCarsTableList
          onEdit={onEdit}
          onDetails={onDetails}
          onDelete={onDelete}
          carData={carData}
        />
      </table>
    );
  }
}
